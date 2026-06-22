'use client'

import { useState } from 'react'
import { PREVIEWS, hasPreview, type PreviewComponent } from '@/previews'
import variantsData from '@/data/variants.json'
import { BadgeVariantPresets } from './badge-variant-presets'
import { ButtonVariantPresets } from './button-variant-presets'
import { ComponentPropsDocs } from './component-props-docs'
import { InputVariantPresets } from './input-variant-presets'
import { LabelVariantPresets } from './label-variant-presets'
import { TooltipPreviewShell } from './tooltip-preview-shell'
import { DialogPreviewShell } from './dialog-preview-shell'
import { PreviewModePanel } from './preview-mode-panel'

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
  appearance: 'Appearance',
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
    const { variant: _variant, decoDir: _decoDir, ...defaults } = info.defaults
    return { ...defaults, decorator: 'none' }
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
    .filter(
      (groupName) => !(['button', 'badge', 'input'].includes(name) && groupName === 'variant')
    )
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
  const hasVariantPresets =
    name === 'button' || name === 'badge' || name === 'input' || name === 'label'
  // ComponentPropsDocs를 렌더할 컴포넌트 목록 — variant preset이 없어도 props docs는
  // 있을 수 있음 (textarea처럼 shape/size만 가진 컴포넌트)
  const hasPropsDocs =
    hasVariantPresets ||
    name === 'textarea' ||
    name === 'checkbox' ||
    name === 'radio-group' ||
    name === 'switch' ||
    name === 'separator' ||
    name === 'skeleton' ||
    name === 'spinner' ||
    name === 'tooltip' ||
    name === 'dialog'
  const controlEntries: Array<[string, string[]]> =
    name === 'input'
      ? [
          ...entries.filter(([groupName]) => groupName !== 'variant' && groupName !== 'decoDir'),
          ['decorator', ['none', 'start', 'end']]
        ]
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
  // 자체 shell에서 탭 분리 + 자체 컨트롤을 모두 처리한다.
  if (name === 'tooltip') {
    return (
      <div className="flex flex-col gap-5">
        <TooltipPreviewShell />
        {hasPropsDocs && <ComponentPropsDocs name={name} />}
      </div>
    )
  }
  if (name === 'dialog') {
    return (
      <div className="flex flex-col gap-5">
        <DialogPreviewShell />
        {hasPropsDocs && <ComponentPropsDocs name={name} />}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <PreviewModePanel
        code={getPreviewCode(name, selections, controlGroups)}
        preview={
          <div className="flex min-h-40 items-center justify-center">
            <Preview selections={selections} />
          </div>
        }
      />

      {info && (
        <div className="border-cool-grey-04 flex flex-col gap-3 border-t pt-5">
          {controlEntries.map(([groupName, values]) => (
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
                      onClick={() => setSelections((prev) => ({ ...prev, [groupName]: value }))}
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
      )}

      {name === 'button' && presetVariants && <ButtonVariantPresets variants={presetVariants} />}
      {name === 'badge' && presetVariants && <BadgeVariantPresets variants={presetVariants} />}
      {name === 'input' && presetVariants && <InputVariantPresets variants={presetVariants} />}
      {name === 'label' && presetVariants && <LabelVariantPresets variants={presetVariants} />}
      {hasPropsDocs && <ComponentPropsDocs name={name} />}
    </div>
  )
}
