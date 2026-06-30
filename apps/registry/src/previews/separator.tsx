import { Separator } from '@transight-design/ui/components/separator'

interface PreviewProps {
  selections?: Record<string, string>
}

type Orientation = NonNullable<Parameters<typeof Separator>[0]['orientation']>
type Tone = NonNullable<Parameters<typeof Separator>[0]['tone']>
type Thickness = NonNullable<Parameters<typeof Separator>[0]['thickness']>

export const Preview = ({ selections = {} }: PreviewProps) => {
  const orientation: Orientation =
    (selections.orientation as Orientation) ?? 'horizontal'

  if (orientation === 'vertical') {
    return (
      <div className='flex h-20 items-center gap-4'>
        <div className='typo-m13 text-fg-default'>왼쪽</div>
        <Separator
          orientation='vertical'
          tone={(selections.tone as Tone) ?? undefined}
          thickness={(selections.thickness as Thickness) ?? undefined}
        />
        <div className='typo-m13 text-fg-default'>오른쪽</div>
      </div>
    )
  }

  return (
    <div className='w-72'>
      <div className='typo-m13 text-fg-default'>위 영역</div>
      <Separator
        className='my-3'
        tone={(selections.tone as Tone) ?? undefined}
        thickness={(selections.thickness as Thickness) ?? undefined}
      />
      <div className='typo-m13 text-fg-default'>아래 영역</div>
    </div>
  )
}
