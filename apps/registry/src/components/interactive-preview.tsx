'use client'

import { useState } from 'react'
import { PREVIEWS, hasPreview, type PreviewComponent } from '@/previews'
import variantsData from '@/data/variants.json'
import { BadgeVariantPresets } from './badge-variant-presets'
import { ButtonVariantPresets } from './button-variant-presets'
import { ComponentPropsDocs, hasVisiblePropsDocs } from './component-props-docs'
import { LabelVariantPresets } from './label-variant-presets'
import { TooltipPreviewShell } from './tooltip-preview-shell'
import { DialogPreviewShell } from './dialog-preview-shell'
import { PreviewModePanel } from './preview-mode-panel'
import { VariantBuilderModal } from './variant-builder-modal'
import { SectionTitle, SectionCard } from './section-title'
import { Button } from '@transight-design/ui/components/button'

/** 디자인 시스템 Style 4축 — 컨트롤 영역에서 우선 그룹으로 묶임 */
const STYLE_AXES = new Set(['color', 'theme', 'shape', 'size'])

interface VariantInfo {
  groups: Record<string, string[]>
  defaults: Record<string, string>
}

const VARIANTS = variantsData as Record<string, VariantInfo>

interface InteractivePreviewProps {
  name: string
}

const GROUP_LABELS: Record<string, string> = {
  color: 'Color',
  theme: 'Theme',
  shape: 'Shape',
  variant: 'Variant',
  size: 'Size',
  inputSize: 'Size',
  decoDir: 'Decorator',
  decorator: 'Decorator'
}

const COMPONENT_LABELS: Record<string, string> = {
  alert: 'Alert',
  badge: 'Badge',
  button: 'Button',
  input: 'Input',
  label: 'Label'
}

const toPascalCase = (value: string) =>
  value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ''}${part.slice(1)}`)
    .join('')

const getDefaultSelections = (name: string, info?: VariantInfo) => {
  if (!info) return {}
  if (name === 'input') {
    // decorator는 합성 토글 (off/on), decoDir은 cva entries 그대로
    return { ...info.defaults, decorator: 'off' }
  }

  if (!['button', 'badge'].includes(name)) return info.defaults

  const { variant: _variant, ...defaults } = info.defaults
  return defaults
}

const getPreviewCode = (
  name: string,
  selections: Record<string, string>,
  groups: Record<string, string[]>
) => {
  const componentName = COMPONENT_LABELS[name] ?? toPascalCase(name)

  if (name === 'input') {
    const props = [`size="${selections.size ?? 'md'}"`]
    const decorator = selections.decorator ?? 'none'

    if (decorator !== 'none') {
      props.push('decorator={<Mail />}')
      if (decorator === 'end') {
        props.push('decoDir="end"')
      }
    }

    return `<${componentName} ${props.join(' ')} />`
  }

  const propEntries = Object.keys(groups)
    .filter((groupName) => !(['button', 'badge'].includes(name) && groupName === 'variant'))
    .map((groupName) => [groupName, selections[groupName]] as const)
    .filter(([, value]) => Boolean(value))

  const props = propEntries.map(([key, value]) => `${key}="${value}"`).join(' ')
  const openTag = props ? `<${componentName} ${props}>` : `<${componentName}>`

  if (name === 'input') return props ? `<${componentName} ${props} />` : `<${componentName} />`
  return `${openTag}${componentName}</${componentName}>`
}

export const InteractivePreview = ({ name }: InteractivePreviewProps) => {
  const Preview: PreviewComponent | undefined = hasPreview(name) ? PREVIEWS[name] : undefined
  const info = VARIANTS[name]
  const [selections, setSelections] = useState<Record<string, string>>(
    getDefaultSelections(name, info)
  )
  const entries = Object.entries(info?.groups ?? {})
  const hasVariantPresets = name === 'button' || name === 'badge' || name === 'label'
  // Props 카드는 hasVisiblePropsDocs(name)로 사전 판단 — 빈 entry면 섹션 자체가 안 그려진다.
  const controlEntries: Array<[string, string[]]> =
    name === 'input'
      ? [
          ...entries.filter(([groupName]) => groupName !== 'variant'),
          ['decorator', ['off', 'on']]
        ]
      : name === 'select'
        ? [...entries, ['decorator', ['off', 'on']]]
        : hasVariantPresets
          ? entries.filter(([groupName]) => groupName !== 'variant')
          : entries
  const controlGroups = Object.fromEntries(controlEntries)
  const presetVariants = hasVariantPresets ? info?.groups.variant : undefined

  if (!Preview) {
    return (
      <div className="text-description py-12 text-center">
        Preview는 추후 점진적으로 추가됩니다.
      </div>
    )
  }

  // tooltip / dialog는 compound 컴포넌트라 Trigger/Content 두 element로 props가 갈라짐.
  // 자체 shell이 Style 영역을 담당. Variant / Props 섹션은 일반 컴포넌트와 동일.
  const variantNodeShared =
    presetVariants && presetVariants.length > 0 ? (
      <VariantSection name={name} presetVariants={presetVariants} selections={selections} />
    ) : null

  if (name === 'tooltip') {
    return (
      <ThreeSectionLayout
        styleNode={<TooltipPreviewShell />}
        variantNode={variantNodeShared}
        propsNode={hasVisiblePropsDocs(name) ? <ComponentPropsDocs name={name} /> : null}
      />
    )
  }
  if (name === 'dialog') {
    return (
      <ThreeSectionLayout
        styleNode={<DialogPreviewShell />}
        variantNode={variantNodeShared}
        propsNode={hasVisiblePropsDocs(name) ? <ComponentPropsDocs name={name} /> : null}
      />
    )
  }

  // STYLE 카드 토글은 4축(color/theme/shape/size)만. 그 외 props는 PROPS 카드 표에 텍스트로만.
  const styleEntries = controlEntries.filter(([k]) => STYLE_AXES.has(k))
  const onSelectionChange = (groupName: string, value: string) =>
    setSelections((prev) => ({ ...prev, [groupName]: value }))

  return (
    <ThreeSectionLayout
      styleNode={
        <>
          <PreviewModePanel
            code={getPreviewCode(name, selections, controlGroups)}
            preview={
              <div className="flex min-h-40 items-center justify-center">
                <Preview selections={selections} />
              </div>
            }
          />
          {styleEntries.length > 0 && (
            <ControlRowsPanel
              entries={styleEntries}
              selections={selections}
              onChange={onSelectionChange}
            />
          )}
        </>
      }
      variantNode={
        presetVariants && presetVariants.length > 0 ? (
          <VariantSection name={name} presetVariants={presetVariants} selections={selections} />
        ) : null
      }
      propsNode={hasVisiblePropsDocs(name) ? <ComponentPropsDocs name={name} /> : null}
    />
  )
}

interface ThreeSectionLayoutProps {
  styleNode: React.ReactNode
  variantNode: React.ReactNode
  propsNode: React.ReactNode
}

const VARIANT_DESCRIPTION =
  '미리 만들어 둔 Style 4축(color/theme/shape/size) 조합을 이름으로 호출하는 preset. 명시한 Style prop이 항상 preset을 덮어쓴다.'

/** Style / Variant / Props 세 섹션을 각자 SectionTitle + SectionCard로 묶음. null 노드는 섹션 통째로 생략. */
const ThreeSectionLayout = ({ styleNode, variantNode, propsNode }: ThreeSectionLayoutProps) => (
  <div className="flex flex-col gap-10">
    <section>
      <SectionTitle>Style</SectionTitle>
      <SectionCard>
        <div className="flex flex-col gap-5">{styleNode}</div>
      </SectionCard>
    </section>
    {variantNode && (
      <section>
        <SectionTitle description={VARIANT_DESCRIPTION}>Variant</SectionTitle>
        <SectionCard>{variantNode}</SectionCard>
      </section>
    )}
    {propsNode && (
      <section>
        <SectionTitle>Props</SectionTitle>
        <SectionCard>{propsNode}</SectionCard>
      </section>
    )}
  </div>
)

interface ControlRowsPanelProps {
  entries: Array<[string, string[]]>
  selections: Record<string, string>
  onChange: (groupName: string, value: string) => void
}

/** 토글 컨트롤 행들을 위쪽 구분선 + 세로 정렬로 보여준다. Style/Props 카드에서 공통 사용. */
const ControlRowsPanel = ({ entries, selections, onChange }: ControlRowsPanelProps) => (
  <div className="border-cool-grey-04 flex flex-col gap-3 border-t pt-5">
    {entries.map(([groupName, values]) => (
      <div key={groupName} className="flex flex-wrap items-center gap-2">
        <span className="typo-sb12 text-cool-grey-07 w-16 shrink-0">
          {GROUP_LABELS[groupName] ?? groupName}
        </span>
        <div className="flex flex-wrap gap-1">
          {values.map((value) => {
            const active = selections[groupName] === value
            return (
              <button
                key={value}
                type="button"
                onClick={() => onChange(groupName, value)}
                className={
                  active
                    ? 'bg-cool-grey-09 typo-mono-m12 rounded-md px-2.5 py-1 text-white'
                    : 'text-cool-grey-07 hover:bg-cool-grey-02 hover:text-cool-grey-11 typo-mono-m12 rounded-md px-2.5 py-1 transition-colors'
                }
              >
                {value}
              </button>
            )
          })}
        </div>
      </div>
    ))}
  </div>
)

interface VariantSectionProps {
  name: string
  presetVariants?: string[]
  selections: Record<string, string>
}

const toPascalCaseLocal = (value: string) =>
  value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ''}${part.slice(1)}`)
    .join('')

const VariantSection = ({ name, presetVariants, selections }: VariantSectionProps) => {
  const componentName = COMPONENT_LABELS[name] ?? toPascalCaseLocal(name)
  // Variant 생성기에는 Style 4축만 baseline으로 넘긴다 (decorator 등 기타 prop은 제외).
  const styleSelections = Object.fromEntries(
    Object.entries(selections).filter(([k]) => STYLE_AXES.has(k))
  )

  const presetPanel =
    name === 'button' && presetVariants ? (
      <ButtonVariantPresets variants={presetVariants} />
    ) : name === 'badge' && presetVariants ? (
      <BadgeVariantPresets variants={presetVariants} />
    ) : name === 'label' && presetVariants ? (
      <LabelVariantPresets variants={presetVariants} />
    ) : null

  return (
    <div className="flex flex-col gap-5">
      {presetPanel}
      <div className="flex items-center justify-end">
        <VariantBuilderModal
          componentName={componentName}
          selections={styleSelections}
          trigger={
            <Button theme="outline" size="xs">
              + Variant 추가
            </Button>
          }
        />
      </div>
    </div>
  )
}
