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

const AGENT_RULE_BLOCK = `아래 내용을 프로젝트 루트의 에이전트 지시 파일에 그대로 추가해줘.
대상 파일: AGENTS.md, AGENT.md, CLAUDE.md, .cursor/rules/* 중 이 프로젝트에서 항상 읽히는 파일.

---

## Transight Design System 사용 강제

UI를 작성하거나 수정하기 전에는 반드시 \`transight-design.AGENT.md\`를 먼저 읽고 따른다.
색상, 타이포, 레이아웃, 컴포넌트, 아이콘은 Transight Design System 규칙을 최우선으로 적용한다.

필수 규칙:
- 색상은 디자인 토큰만 사용한다. raw hex/rgb와 Tailwind 기본 팔레트 사용을 금지한다.
- 텍스트는 \`typo-*\` 프리셋과 시맨틱 텍스트 색상 토큰을 사용한다.
- 레이아웃 정렬은 flex 유틸과 gap을 우선 사용한다.
- 설치된 컴포넌트는 \`@/components/base/*\`, \`@/components/custom/*\`, \`@/icons/*\` 경로에서 import한다.
- 도메인 아이콘은 Transight \`Icon\`, 범용 UI 아이콘은 \`lucide-react\`를 사용한다.
- 임의 스타일을 추가하기 전에 기존 컴포넌트의 color/theme/shape/size/variant props로 해결 가능한지 먼저 확인한다.
- UI 작업 완료 전 \`transight-design.AGENT.md\`의 SELF-CHECK를 기준으로 위반 여부를 점검한다.

위 규칙과 충돌하는 일반 Tailwind/shadcn 관성은 무시하고, Transight Design System을 우선한다.`

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
      console.log('')
      console.log(pc.green('✓ 설치 완료'))
      console.log('')
      console.log(pc.bold('다음으로 AI Agent에게 아래 블록을 그대로 지시하세요:'))
      console.log('')
      console.log(pc.cyan(AGENT_RULE_BLOCK))
      console.log('')
      console.log(pc.dim('(에이전트가 항상 읽는 프로젝트 규칙 파일에 디자인 시스템 사용을 강제합니다)'))
      console.log('')
    }

    process.exit(code)
  })
