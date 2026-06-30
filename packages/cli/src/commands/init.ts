import { Command } from 'commander'
import pc from 'picocolors'
import * as p from '@clack/prompts'
import { BUNDLE_ITEMS, githubAddress, type BundleKey } from '@/config'
import { runShadcn } from '@/lib/runner'

interface InitOptions {
  dryRun?: boolean
  ref?: string
  bundle?: BundleKey
}

const BUNDLE_CHOICES: Array<{ value: BundleKey; label: string; hint: string }> = [
  {
    value: 'base',
    label: 'Base 컴포넌트만',
    hint: 'shadcn 표준 base 컴포넌트 (accordion, button, dialog 등)'
  },
  {
    value: 'essential',
    label: '필수 컴포넌트만',
    hint: '서비스 초기 구성에 필요한 핵심 폼/액션 컴포넌트'
  },
  {
    value: 'all',
    label: '전체 컴포넌트',
    hint: '토큰 + 폰트 + lib + hook + 모든 컴포넌트'
  }
]

const isBundleKey = (value: string | undefined): value is BundleKey =>
  value !== undefined && value in BUNDLE_ITEMS

/**
 * `transight-design init`
 *
 * 디자인 시스템 번들 설치. 옵션을 안 주면 base/essential/all 중 선택 프롬프트.
 * `--bundle <base|essential|all>`로 비대화 실행 가능.
 */
export const initCommand: Command = new Command('init')
  .description('Transight Design System 번들 설치 (base / essential / all 중 선택)')
  .option('--dry-run', '실행하지 않고 호출할 명령만 출력', false)
  .option('--ref <ref>', 'GitHub 레퍼런스 (브랜치·태그·SHA)')
  .option('--bundle <name>', '대화 프롬프트 생략 — base | essential | all')
  .action(async (options: InitOptions) => {
    console.log(pc.bold(pc.cyan('Transight Design System')) + ' — init')

    let bundle: BundleKey | undefined = isBundleKey(options.bundle as string | undefined)
      ? options.bundle
      : undefined

    if (!bundle) {
      const selected = await p.select({
        message: '설치할 컴포넌트를 선택하세요',
        options: BUNDLE_CHOICES,
        initialValue: 'all' as BundleKey
      })

      if (p.isCancel(selected)) {
        p.cancel('취소되었습니다.')
        process.exit(0)
      }

      bundle = selected as BundleKey
    }

    const itemName = BUNDLE_ITEMS[bundle]
    const code: number = await runShadcn(['add', githubAddress(itemName, options.ref)], {
      dryRun: options.dryRun
    })

    if (code === 0 && !options.dryRun) {
      const agentInstruction =
        '루트 에이전트 지시 파일(AGENTS.md/AGENT.md/CLAUDE.md/.cursor/rules)에 "UI 작업 전 transight-design.AGENT.md를 반드시 읽고 따른다"를 추가해줘'
      console.log('')
      console.log(pc.green('✓ 설치 완료'))
      console.log('')
      console.log(pc.bold('다음으로 AI Agent에게 아래 문구를 지시하세요:'))
      console.log('')
      console.log('  ' + pc.cyan(pc.bold(agentInstruction)))
      console.log('')
      console.log(pc.dim('(에이전트가 항상 읽는 프로젝트 규칙 파일에 디자인 시스템 참조를 고정합니다)'))
      console.log('')
    }

    process.exit(code)
  })
