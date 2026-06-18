import { Command } from 'commander'
import pc from 'picocolors'
import { GITHUB_REPO } from '@/config'
import { runShadcn } from '@/lib/runner'

/**
 * `transight-design list`
 *
 * 레지스트리의 모든 아이템 목록을 출력.
 * 내부적으로 `shadcn list traverse-corp/transight-design`을 실행.
 */
export const listCommand: Command = new Command('list')
  .description('사용 가능한 모든 컴포넌트 목록')
  .option('--dry-run', '실행하지 않고 호출할 명령만 출력', false)
  .action(async (options: { dryRun?: boolean }) => {
    console.log(pc.bold(pc.cyan('Transight Design System')) + ' — list')
    const code: number = await runShadcn(['list', GITHUB_REPO], { dryRun: options.dryRun })
    process.exit(code)
  })
