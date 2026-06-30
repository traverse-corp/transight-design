import { Command } from 'commander'
import pc from 'picocolors'
import { githubAddress } from '@/config'
import { runShadcn } from '@/lib/runner'

interface AddOptions {
  dryRun?: boolean
  ref?: string
  overwrite?: boolean
}

/**
 * `transight-design add <component...>`
 *
 * 개별 컴포넌트나 pack을 사용자 프로젝트에 설치. 여러 개 동시 가능.
 * 내부적으로 `shadcn add traverse-corp/transight-design/<name> ...`를 실행.
 *
 * `--overwrite`는 shadcn의 동일 옵션을 그대로 pass-through — 기존 파일을
 * prompt 없이 덮어쓴다. 이미 설치된 컴포넌트를 최신 디자인 시스템 SoT로
 * 업데이트할 때 사용.
 */
export const addCommand: Command = new Command('add')
  .description('컴포넌트/팩 추가 (예: transight-design add essential 또는 button card dialog)')
  .argument('<components...>', '설치할 컴포넌트 또는 팩 이름들')
  .option('--dry-run', '실행하지 않고 호출할 명령만 출력', false)
  .option('--ref <ref>', 'GitHub 레퍼런스 (브랜치·태그·SHA)')
  .option('--overwrite', '기존 파일을 prompt 없이 덮어쓰기 (업데이트 용)', false)
  .action(async (components: string[], options: AddOptions) => {
    if (components.length === 0) {
      console.error(pc.red('컴포넌트 이름을 하나 이상 지정해주세요.'))
      process.exit(1)
    }
    const addresses: string[] = components.map((name) => githubAddress(name, options.ref))
    console.log(
      pc.bold(pc.cyan('Transight Design System')) + ` — add ${pc.yellow(components.join(', '))}`
    )
    const args: string[] = ['add', ...addresses]
    if (options.overwrite) args.push('--overwrite')
    const code: number = await runShadcn(args, { dryRun: options.dryRun })
    process.exit(code)
  })
