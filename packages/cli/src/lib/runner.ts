import { spawn } from 'node:child_process'
import pc from 'picocolors'

/**
 * shadcn CLI 위임 실행기.
 *
 * 사용자 프로젝트의 패키지 매니저(npm/pnpm/bun)를 자동 탐지하여 적절한
 * 패키지 러너로 `shadcn@latest`를 실행한다.
 */

export interface RunOptions {
  /** dry-run 모드 — 실제 실행 대신 명령만 출력 */
  dryRun?: boolean
  /** 작업 디렉토리 (기본: process.cwd()) */
  cwd?: string
}

const detectRunner = (): { cmd: string; prefix: string[] } => {
  // 사용자가 패키지 매니저를 어떻게 설정했는지 npm_config_user_agent로 감지
  const ua: string = process.env.npm_config_user_agent ?? ''
  if (ua.startsWith('pnpm')) return { cmd: 'pnpm', prefix: ['dlx'] }
  if (ua.startsWith('bun')) return { cmd: 'bunx', prefix: ['--bun'] }
  if (ua.startsWith('yarn')) return { cmd: 'yarn', prefix: ['dlx'] }
  return { cmd: 'npx', prefix: [] }
}

/** shadcn CLI 명령 실행 (예: `runShadcn(['add', 'traverse-corp/transight-design/button'])`) */
export const runShadcn = (args: string[], options: RunOptions = {}): Promise<number> => {
  const { cmd, prefix } = detectRunner()
  const fullArgs: string[] = [...prefix, 'shadcn@latest', ...args]
  const display: string = `${cmd} ${fullArgs.join(' ')}`

  if (options.dryRun) {
    console.log(pc.dim('[dry-run] ') + pc.cyan(display))
    return Promise.resolve(0)
  }

  console.log(pc.dim('→ ') + pc.cyan(display))

  return new Promise((resolve) => {
    const proc = spawn(cmd, fullArgs, {
      stdio: 'inherit',
      cwd: options.cwd ?? process.cwd(),
      shell: process.platform === 'win32'
    })
    proc.on('close', (code) => resolve(code ?? 0))
    proc.on('error', (err) => {
      console.error(pc.red(`shadcn 실행 실패: ${err.message}`))
      resolve(1)
    })
  })
}
