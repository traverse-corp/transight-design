import { access, mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve, sep } from 'node:path'
import { Command } from 'commander'
import pc from 'picocolors'
import { GITHUB_REPO } from '@/config'

interface UpdateOptions {
  dryRun?: boolean
  ref?: string
}

interface RegistryFile {
  target?: string
  path?: string
  content?: string
}

interface RegistryItem {
  name: string
  files?: RegistryFile[]
}

const DEFAULT_REF = 'main'

const itemUrl = (name: string, ref?: string): string => {
  const [owner, repo] = GITHUB_REPO.split('/')
  const resolvedRef = ref ?? DEFAULT_REF
  return `https://raw.githubusercontent.com/${owner}/${repo}/${resolvedRef}/packages/ui/public/r/${name}.json`
}

const targetPathFor = (file: RegistryFile): string | null => {
  const target = file.target ?? file.path
  if (!target) return null
  if (target.startsWith('~/')) return target.slice(2)
  if (target.startsWith('./')) return target.slice(2)
  return target
}

const resolveInsideCwd = (relativeTarget: string): string => {
  const cwd = process.cwd()
  const absolute = resolve(cwd, relativeTarget)
  const cwdWithSeparator = cwd.endsWith(sep) ? cwd : `${cwd}${sep}`

  if (absolute !== cwd && !absolute.startsWith(cwdWithSeparator)) {
    throw new Error(`프로젝트 밖 경로는 업데이트할 수 없습니다: ${relativeTarget}`)
  }

  return absolute
}

const ensureInstalled = async (absolutePath: string): Promise<void> => {
  try {
    await access(absolutePath)
  } catch {
    throw new Error(`설치된 파일을 찾을 수 없습니다: ${absolutePath}`)
  }
}

const fetchRegistryItem = async (name: string, ref?: string): Promise<RegistryItem> => {
  const url = itemUrl(name, ref)
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`registry item을 가져오지 못했습니다 (${response.status}): ${url}`)
  }

  return (await response.json()) as RegistryItem
}

export const updateCommand: Command = new Command('update')
  .description('이미 설치된 컴포넌트 파일만 업데이트 (dependencies/styles는 덮어쓰지 않음)')
  .argument('<components...>', '업데이트할 컴포넌트 이름들')
  .option('--dry-run', '실행하지 않고 변경 대상만 출력', false)
  .option('--ref <ref>', 'GitHub 레퍼런스 (브랜치·태그·SHA)')
  .action(async (components: string[], options: UpdateOptions) => {
    if (components.length === 0) {
      console.error(pc.red('컴포넌트 이름을 하나 이상 지정해주세요.'))
      process.exit(1)
    }

    console.log(
      pc.bold(pc.cyan('Transight Design System')) +
        ` — update ${pc.yellow(components.join(', '))}`
    )

    try {
      for (const component of components) {
        const item = await fetchRegistryItem(component, options.ref)
        const files = item.files ?? []

        if (files.length === 0) {
          throw new Error(`업데이트할 파일이 없습니다: ${component}`)
        }

        for (const file of files) {
          if (typeof file.content !== 'string') {
            throw new Error(`registry item에 content가 없습니다: ${component}`)
          }

          const target = targetPathFor(file)
          if (!target) {
            throw new Error(`target 경로가 없습니다: ${component}`)
          }

          const absoluteTarget = resolveInsideCwd(target)
          await ensureInstalled(absoluteTarget)

          if (options.dryRun) {
            console.log(pc.dim('[dry-run] ') + pc.cyan(`${component} -> ${target}`))
            continue
          }

          await mkdir(dirname(absoluteTarget), { recursive: true })
          await writeFile(absoluteTarget, file.content, 'utf-8')
          console.log(pc.green('updated ') + target)
        }
      }

      process.exit(0)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error(pc.red(message))
      process.exit(1)
    }
  })
