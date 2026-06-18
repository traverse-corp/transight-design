import { Command } from 'commander'
import pc from 'picocolors'
import { githubAddress } from '@/config'
import { runShadcn } from '@/lib/runner'

interface ViewOptions {
  dryRun?: boolean
  ref?: string
}

/**
 * `transight-design view <component>`
 *
 * 설치하지 않고 컴포넌트의 레지스트리 정보(파일·deps·메타)만 조회.
 */
export const viewCommand: Command = new Command('view')
  .description('컴포넌트 정보 미리 보기 (설치 안 함)')
  .argument('<component>', '조회할 컴포넌트 이름')
  .option('--dry-run', '실행하지 않고 호출할 명령만 출력', false)
  .option('--ref <ref>', 'GitHub 레퍼런스')
  .action(async (component: string, options: ViewOptions) => {
    console.log(pc.bold(pc.cyan('Transight Design System')) + ` — view ${pc.yellow(component)}`)
    const code: number = await runShadcn(['view', githubAddress(component, options.ref)], {
      dryRun: options.dryRun
    })
    process.exit(code)
  })
