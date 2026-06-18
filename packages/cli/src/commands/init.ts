import { Command } from 'commander'
import pc from 'picocolors'
import { BUNDLE_ITEM, githubAddress } from '@/config'
import { runShadcn } from '@/lib/runner'

interface InitOptions {
  dryRun?: boolean
  ref?: string
}

/**
 * `transight-design init`
 *
 * 디자인 시스템 전체 번들 (토큰 + 폰트 + lib + hooks + 모든 컴포넌트) 한 방 설치.
 * 내부적으로 `shadcn add traverse-corp/transight-design/transight-design`을 실행.
 */
export const initCommand: Command = new Command('init')
  .description('Transight Design System 전체 번들 설치 (토큰·폰트·lib·hooks·컴포넌트)')
  .option('--dry-run', '실행하지 않고 호출할 명령만 출력', false)
  .option('--ref <ref>', 'GitHub 레퍼런스 (브랜치·태그·SHA)')
  .action(async (options: InitOptions) => {
    console.log(pc.bold(pc.cyan('Transight Design System')) + ' — init')
    const code: number = await runShadcn(
      ['add', githubAddress(BUNDLE_ITEM, options.ref)],
      { dryRun: options.dryRun }
    )
    process.exit(code)
  })
