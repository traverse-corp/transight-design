import * as React from 'react'
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const Tabs = ({ className, orientation = 'horizontal', ...props }: TabsPrimitive.Root.Props) => (
  <TabsPrimitive.Root
    data-slot='tabs'
    data-orientation={orientation}
    className={cn(
      'group/tabs flex w-full gap-2 data-[orientation=horizontal]:flex-col',
      className
    )}
    {...props}
  />
)

// 색은 12개 enum. 활성 색은 CSS 변수(--tab-active)에 토큰을 주입하고 trigger className이 var()로 참조.
const TAB_COLOR_TOKEN: Record<string, string> = {
  gray: 'var(--color-cool-grey-09)',
  blue: 'var(--color-primary-blue-1)',
  red: 'var(--color-ui-red)',
  orange: 'var(--color-ui-orange)',
  yellow: 'var(--color-ui-yellow)',
  olive: 'var(--color-ui-olive)',
  green: 'var(--color-ui-green)',
  skyblue: 'var(--color-ui-skyblue)',
  purple: 'var(--color-ui-purple)',
  pink: 'var(--color-ui-pink)',
  amber: 'var(--color-ui-amber)',
  white: 'var(--color-cool-grey-white)',
  'gradient-blue': 'var(--color-primary-blue-1)'
}

const tabsListClassVariants = cva(
  'group/tabs-list inline-flex w-full items-center justify-start group-data-vertical/tabs:h-fit group-data-vertical/tabs:w-fit group-data-vertical/tabs:flex-col',
  {
    variants: {
      shape: {
        pill: 'bg-bg-muted rounded-lg p-[3px]',
        line: 'border-border-default gap-1 border-b group-data-vertical/tabs:border-b-0 group-data-vertical/tabs:border-r'
      },
      theme: {
        solid: '',
        outline: '',
        soft: ''
      },
      size: {
        sm: 'h-8',
        md: 'h-9',
        lg: 'h-11'
      },
      color: {
        gray: '',
        blue: '',
        red: '',
        orange: '',
        yellow: '',
        olive: '',
        green: '',
        skyblue: '',
        purple: '',
        pink: '',
        amber: '',
        white: '',
        'gradient-blue': ''
      }
    },
    defaultVariants: {
      shape: 'pill',
      theme: 'solid',
      size: 'md',
      color: 'blue'
    }
  }
)

type TabsListVariantProps = VariantProps<typeof tabsListClassVariants>
type TabsListColor = NonNullable<TabsListVariantProps['color']>

const TabsList = ({
  className,
  shape,
  theme,
  size,
  color,
  style,
  ...props
}: TabsPrimitive.List.Props & TabsListVariantProps) => {
  const resolvedColor: TabsListColor = color ?? 'blue'
  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      data-shape={shape ?? 'pill'}
      data-theme={theme ?? 'solid'}
      data-size={size ?? 'md'}
      style={{
        ['--tab-active' as string]: TAB_COLOR_TOKEN[resolvedColor] ?? TAB_COLOR_TOKEN.blue,
        ...style
      }}
      className={cn(tabsListClassVariants({ shape, theme, size, color }), className)}
      {...props}
    />
  )
}

// trigger 활성 시각은 부모 TabsList의 data-shape × data-theme 조합에서 결정.
// 활성 색은 --tab-active CSS 변수에서 읽음.
const tabsTriggerClasses = cn(
  'group-data-[size=sm]/tabs-list:typo-m12 group-data-[size=md]/tabs-list:typo-m13 group-data-[size=lg]/tabs-list:typo-m14',
  'text-fg-muted hover:text-fg-strong disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none',
  'relative inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap transition-colors group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start',
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  // ── shape=pill 기본 형태 (theme 무관 공통) ─────────
  'group-data-[shape=pill]/tabs-list:rounded-md group-data-[shape=pill]/tabs-list:px-3 group-data-[shape=pill]/tabs-list:py-1 group-data-[shape=pill]/tabs-list:border group-data-[shape=pill]/tabs-list:border-transparent',
  // pill + solid: 활성 탭이 색으로 채워짐, 텍스트 흰색
  'group-data-[shape=pill]/tabs-list:group-data-[theme=solid]/tabs-list:data-active:bg-[var(--tab-active)] group-data-[shape=pill]/tabs-list:group-data-[theme=solid]/tabs-list:data-active:text-on-dark group-data-[shape=pill]/tabs-list:group-data-[theme=solid]/tabs-list:data-active:shadow-sm',
  // pill + outline: 활성 탭 흰 배경 + 색 border + 색 텍스트
  'group-data-[shape=pill]/tabs-list:group-data-[theme=outline]/tabs-list:data-active:bg-bg-card group-data-[shape=pill]/tabs-list:group-data-[theme=outline]/tabs-list:data-active:border-[color:var(--tab-active)] group-data-[shape=pill]/tabs-list:group-data-[theme=outline]/tabs-list:data-active:text-[var(--tab-active)]',
  // pill + soft: 활성 탭 흰 배경 + 색 텍스트 + 옅은 shadow
  'group-data-[shape=pill]/tabs-list:group-data-[theme=soft]/tabs-list:data-active:bg-bg-card group-data-[shape=pill]/tabs-list:group-data-[theme=soft]/tabs-list:data-active:text-[var(--tab-active)] group-data-[shape=pill]/tabs-list:group-data-[theme=soft]/tabs-list:data-active:shadow-sm',
  // ── shape=line (theme 영향 없음) ─────────
  'group-data-[shape=line]/tabs-list:px-3 group-data-[shape=line]/tabs-list:py-2 group-data-[shape=line]/tabs-list:-mb-px group-data-[shape=line]/tabs-list:border-b-2 group-data-[shape=line]/tabs-list:border-transparent',
  'group-data-[shape=line]/tabs-list:data-active:text-[var(--tab-active)] group-data-[shape=line]/tabs-list:data-active:border-[color:var(--tab-active)]'
)

const TabsTrigger = ({ className, ...props }: TabsPrimitive.Tab.Props) => (
  <TabsPrimitive.Tab data-slot='tabs-trigger' className={cn(tabsTriggerClasses, className)} {...props} />
)

const TabsContent = ({ className, ...props }: TabsPrimitive.Panel.Props) => (
  <TabsPrimitive.Panel
    data-slot='tabs-content'
    className={cn('text-fg-default typo-m14 flex-1 outline-none', className)}
    {...props}
  />
)

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListClassVariants }
