#!/usr/bin/env node
/**
 * Transight Design System CLI
 *
 * shadcn CLI에 GitHub source registry로 위임하는 얇은 래퍼.
 * 사용자는 `transight-design init`, `transight-design add button` 식으로 호출.
 * 무거운 로직(파일 복사·import 재작성·tsconfig 갱신 등)은 모두 shadcn이 처리.
 */

import { Command } from 'commander'
import { initCommand } from '@/commands/init'
import { addCommand } from '@/commands/add'
import { listCommand } from '@/commands/list'
import { viewCommand } from '@/commands/view'

const program: Command = new Command()

program
  .name('transight-design')
  .description('Transight Design System CLI (shadcn 위임 래퍼)')
  .version('0.0.0')

program.addCommand(initCommand)
program.addCommand(addCommand)
program.addCommand(listCommand)
program.addCommand(viewCommand)

program.parseAsync(process.argv).catch((err: unknown) => {
  console.error(err)
  process.exit(1)
})
