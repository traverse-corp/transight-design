import { Command } from 'commander'
import pc from 'picocolors'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

/** Style 4축 — variant는 이 키들만 허용 */
const STYLE_AXES = ['color', 'theme', 'shape', 'size'] as const
type StyleAxis = (typeof STYLE_AXES)[number]

interface VariantAddOptions {
  component?: string
  name?: string
  color?: string
  theme?: string
  shape?: string
  size?: string
  /** preset 파일 위치 override. 미지정 시 base/custom 둘 다 탐색. */
  path?: string
  /** 실제로 쓰지 않고 변경사항만 출력 */
  dryRun?: boolean
}

/**
 * 사용자 repo에서 `<component>.tsx` 파일 위치 탐색.
 * 기본 후보:
 *   - shadcn install 결과: `./src/components/{base|custom}/<X>.tsx`
 *   - transight-design monorepo dev: `./packages/ui/src/components/<X>.tsx`
 * --path 옵션으로 override 가능.
 */
const resolveComponentPath = (component: string, override?: string): string | null => {
  if (override) {
    const abs = join(process.cwd(), override)
    return existsSync(abs) ? abs : null
  }
  const candidates = [
    join(process.cwd(), 'src', 'components', 'base', `${component}.tsx`),
    join(process.cwd(), 'src', 'components', 'custom', `${component}.tsx`),
    join(process.cwd(), 'packages', 'ui', 'src', 'components', `${component}.tsx`)
  ]
  return candidates.find((p) => existsSync(p)) ?? null
}

/**
 * `<X>VariantPresets = {` 객체의 시작과 끝 위치를 찾는다.
 * 균형잡힌 중괄호 카운팅으로 닫는 `}` 위치 반환.
 * satisfies 절은 그 뒤에 따라오므로 직전까지만 잡는다.
 */
const findPresetObjectRange = (
  source: string,
  component: string
): { startBrace: number; endBrace: number } | null => {
  // `xxxVariantPresets = {` 패턴 (xxx = component 이름 또는 임의 식별자)
  const re = /([A-Za-z_$][\w$]*)VariantPresets\s*=\s*\{/g
  let match: RegExpExecArray | null
  while ((match = re.exec(source)) !== null) {
    // brace open 위치
    const startBrace = match.index + match[0].length - 1
    // 균형 카운팅으로 닫는 `}` 찾기
    let depth = 1
    let i = startBrace + 1
    let inString: string | null = null
    while (depth > 0 && i < source.length) {
      const c = source[i]
      if (inString) {
        if (c === inString && source[i - 1] !== '\\') inString = null
      } else if (c === '"' || c === "'" || c === '`') {
        inString = c
      } else if (c === '{') {
        depth++
      } else if (c === '}') {
        depth--
      }
      i++
    }
    if (depth === 0) {
      return { startBrace, endBrace: i - 1 }
    }
  }
  return null
}

/**
 * preset 객체 본문에서 마지막 ',' 또는 마지막 키 끝 위치 찾기.
 * 새 항목을 마지막 키 뒤에 삽입한다.
 */
const buildNewPresetLine = (name: string, styles: Partial<Record<StyleAxis, string>>): string => {
  const parts: string[] = []
  for (const axis of STYLE_AXES) {
    const value = styles[axis]
    if (value) parts.push(`${axis}: '${value}'`)
  }
  return `  '${name}': { ${parts.join(', ')} }`
}

const insertPresetLine = (source: string, component: string, line: string): string | null => {
  const range = findPresetObjectRange(source, component)
  if (!range) return null

  const before = source.slice(0, range.endBrace)
  const after = source.slice(range.endBrace)

  // 마지막 ',' 가 있으면 그대로, 없으면 추가
  const trimmedBefore = before.trimEnd()
  const needsComma = !trimmedBefore.endsWith(',') && !trimmedBefore.endsWith('{')

  // 들여쓰기 처리 — 객체 본문이 빈 경우 line 그대로, 아니면 줄바꿈
  if (trimmedBefore.endsWith('{')) {
    return `${trimmedBefore}\n${line}\n${after}`
  }
  return `${trimmedBefore}${needsComma ? ',' : ''}\n${line}${after}`
}

export const variantCommand: Command = new Command('variant').description(
  '컴포넌트의 variant preset 관리 (현재: add)'
)

variantCommand
  .command('add')
  .description(
    '새 variant를 컴포넌트 파일의 <X>VariantPresets 객체에 한 줄로 추가. ' +
      'Style 4축(color/theme/shape/size)만 받음. 미명시 축은 cva default로 자동.'
  )
  .requiredOption('--component <name>', '컴포넌트 이름 (예: button)')
  .requiredOption('--name <name>', '추가할 variant 이름 (예: my-brand)')
  .option('--color <value>', 'color (gray/blue/red/orange/yellow/olive/green/skyblue/purple/pink/white/gradient-blue)')
  .option('--theme <value>', 'theme (solid/outline/soft)')
  .option('--shape <value>', 'shape (default/pill/square)')
  .option('--size <value>', 'size (xs/sm/md/lg/xl)')
  .option('--path <path>', '컴포넌트 파일 경로 override (기본: src/components/{base|custom}/<X>.tsx)')
  .option('--dry-run', '실제 파일을 쓰지 않고 결과만 출력', false)
  .action(async (options: VariantAddOptions) => {
    const { component, name, path, dryRun } = options
    if (!component || !name) {
      console.error(pc.red('--component와 --name은 필수입니다.'))
      process.exit(1)
    }
    if (!STYLE_AXES.some((axis) => options[axis])) {
      console.error(
        pc.red('color / theme / shape / size 중 최소 한 축은 지정해야 의미 있는 variant입니다.')
      )
      process.exit(1)
    }

    const filePath = resolveComponentPath(component, path)
    if (!filePath) {
      console.error(
        pc.red(
          `컴포넌트 파일을 찾지 못했습니다: ${component}\n` +
            `기본 경로: src/components/base/${component}.tsx 또는 src/components/custom/${component}.tsx\n` +
            `--path <경로>로 직접 지정 가능합니다.`
        )
      )
      process.exit(1)
    }

    const source = readFileSync(filePath, 'utf-8')
    const styles: Partial<Record<StyleAxis, string>> = {}
    for (const axis of STYLE_AXES) {
      const value = options[axis]
      if (value) styles[axis] = value
    }

    const line = buildNewPresetLine(name, styles)
    const next = insertPresetLine(source, component, line)
    if (!next) {
      console.error(
        pc.red(
          `${component}VariantPresets 객체를 ${filePath}에서 찾지 못했습니다.\n` +
            `컴포넌트 파일에 variant preset 슬롯이 정의되어 있는지 확인하세요.`
        )
      )
      process.exit(1)
    }

    console.log(
      pc.bold(pc.cyan('Transight Design System')) +
        ` — variant add ${pc.yellow(`${component}.${name}`)}`
    )
    console.log(pc.dim(`  파일: ${filePath}`))
    console.log(pc.dim(`  추가 라인:`))
    console.log(`    ${line}`)

    if (dryRun) {
      console.log(pc.yellow('\n[dry-run] 파일을 쓰지 않았습니다.'))
      return
    }

    writeFileSync(filePath, next, 'utf-8')
    console.log(pc.green('\n✓ 등록 완료. <' + capitalize(component) + ` variant="${name}" />로 사용하세요.`))
  })

const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1)
