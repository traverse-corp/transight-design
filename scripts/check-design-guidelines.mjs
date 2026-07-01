import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const baselinePath = path.join(root, 'scripts', 'design-guideline-baseline.json')
const shouldUpdateBaseline = process.argv.includes('--update-baseline')

const scanRoots = [
  path.join(root, 'packages', 'ui', 'src', 'components'),
  path.join(root, 'apps', 'registry', 'src')
]

const extensions = new Set(['.ts', '.tsx', '.css'])
const ignoredPathParts = [
  `${path.sep}.next${path.sep}`,
  `${path.sep}public${path.sep}`,
  `${path.sep}node_modules${path.sep}`
]

const checks = [
  {
    id: 'raw-color',
    description: 'raw hex, rgb/rgba, or Tailwind default palette colors',
    pattern:
      /#[0-9a-fA-F]{3,8}|rgba?\(|\b(?:text|bg|border|ring|from|to|via)-(?:white|black|gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:-\d{2,3})?\b/
  },
  {
    id: 'raw-typography',
    description: 'Tailwind raw typography classes instead of typo-* utilities',
    pattern:
      /\b(?:text-(?:xs|sm|base|lg|xl|[2-9]xl|\[[^\]]+\])|font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)|leading-(?:none|tight|snug|normal|relaxed|loose|\d+|\[[^\]]+\]))\b/
  },
  {
    id: 'inline-style',
    description: 'inline style usage',
    pattern: /\bstyle=\{\{/
  },
  {
    id: 'cva-variant-axis',
    description: 'cva variants using variant as a visual axis',
    pattern: /^\s*variant:\s*\{/
  }
]

const toRelative = (filePath) => path.relative(root, filePath).replaceAll(path.sep, '/')

const walk = (dir) => {
  if (!fs.existsSync(dir)) return []

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (ignoredPathParts.some((part) => fullPath.includes(part))) continue

    if (entry.isDirectory()) {
      files.push(...walk(fullPath))
    } else if (extensions.has(path.extname(entry.name))) {
      files.push(fullPath)
    }
  }

  return files
}

const scan = () => {
  const violations = Object.fromEntries(checks.map((check) => [check.id, []]))

  for (const file of scanRoots.flatMap(walk)) {
    const relativePath = toRelative(file)
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)

    lines.forEach((line, index) => {
      for (const check of checks) {
        check.pattern.lastIndex = 0
        if (!check.pattern.test(line)) continue

        violations[check.id].push({
          file: relativePath,
          line: index + 1,
          snippet: line.trim().slice(0, 160)
        })
      }
    })
  }

  return violations
}

const summarize = (violations) =>
  Object.fromEntries(Object.entries(violations).map(([rule, items]) => [rule, items.length]))

const violations = scan()
const summary = summarize(violations)

if (shouldUpdateBaseline) {
  fs.writeFileSync(
    baselinePath,
    `${JSON.stringify(
      {
        description:
          'Existing design guideline debt. check-design-guidelines.mjs fails only when counts increase.',
        counts: summary
      },
      null,
      2
    )}\n`
  )
  console.log(`[design-lint] baseline updated: ${toRelative(baselinePath)}`)
  console.table(summary)
  process.exit(0)
}

const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'))
const failures = []

for (const check of checks) {
  const current = summary[check.id] ?? 0
  const allowed = baseline.counts[check.id] ?? 0

  if (current > allowed) {
    failures.push({ check, current, allowed, added: current - allowed })
  }
}

if (failures.length > 0) {
  console.error('[design-lint] design guideline violations increased.')

  for (const { check, current, allowed, added } of failures) {
    console.error(`\n${check.id}: ${current} current / ${allowed} allowed (+${added})`)
    console.error(`  ${check.description}`)
    for (const item of violations[check.id].slice(0, 10)) {
      console.error(`  - ${item.file}:${item.line} ${item.snippet}`)
    }
  }

  console.error('\nFix the new violations or intentionally refresh the baseline after cleanup.')
  process.exit(1)
}

console.log('[design-lint] passed')
console.table(summary)
