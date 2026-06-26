'use client'

interface PropDoc {
  name: string
  type: string
  defaultValue?: string
  description: string
}

/** 컴포넌트 props를 sub-element별로 그룹화. ex: tooltip의 Trigger / Content */
interface PropGroup {
  title: string
  description?: string
  props: PropDoc[]
}

type PropsEntry = PropDoc[] | PropGroup[]

/** PropGroup[]인지 판별 — 첫 요소가 'props' 키를 가지면 그룹 모드 */
const isPropGroups = (entry: PropsEntry): entry is PropGroup[] => {
  const first = entry[0]
  return first !== undefined && 'props' in first
}

const PROPS_DOCS: Record<string, PropsEntry> = {
  button: [
    {
      name: 'variant',
      type: "'default' | 'destructive' | 'success' | 'dark'",
      defaultValue: "'default'",
      description: '반복해서 쓰는 버튼 조합을 preset으로 호출합니다.'
    },
    {
      name: 'color',
      type: "'gray' | 'blue' | 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'skyblue' | 'purple' | 'pink' | 'white' | 'gradient-blue'",
      defaultValue: "'gray'",
      description: '버튼의 색상 축입니다. 지정하면 variant preset의 color보다 우선합니다.'
    },
    {
      name: 'theme',
      type: "'solid' | 'outline' | 'soft'",
      defaultValue: "'solid'",
      description: '채움, 외곽선, 연한 배경 스타일을 결정합니다.'
    },
    {
      name: 'shape',
      type: "'default' | 'pill' | 'square'",
      defaultValue: "'default'",
      description: '모서리 형태를 결정합니다.'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'md'",
      description: '버튼 높이, 패딩, 텍스트 크기를 결정합니다.'
    }
  ],
  badge: [
    {
      name: 'variant',
      type: "'lea' | 'vasp' | 'tx-swap' | 'tx-bridge'",
      description: '반복해서 쓰는 뱃지 조합을 preset으로 호출합니다.'
    },
    {
      name: 'color',
      type: "'gray' | 'blue' | 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'skyblue' | 'purple' | 'pink' | 'white' | 'gradient-blue'",
      defaultValue: "'gray'",
      description: '뱃지의 색상 축입니다. 지정하면 variant preset의 color보다 우선합니다.'
    },
    {
      name: 'theme',
      type: "'solid' | 'outline' | 'soft'",
      defaultValue: "'solid'",
      description: '채움, 외곽선, 연한 배경 스타일을 결정합니다.'
    },
    {
      name: 'shape',
      type: "'default' | 'pill' | 'square'",
      defaultValue: "'default'",
      description: '모서리 형태를 결정합니다.'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'md'",
      description: '뱃지 패딩과 텍스트 크기를 결정합니다.'
    }
  ],
  input: [
    {
      name: 'decorator',
      type: 'React.ReactNode',
      description: 'input 앞/뒤에 붙일 컴포넌트(아이콘 등). decoDir로 위치 지정.'
    },
    {
      name: 'decoDir',
      type: "'start' | 'end'",
      defaultValue: "'start'",
      description: 'decorator가 붙는 방향.'
    },
    {
      name: 'onDecoratorClick',
      type: '(e: MouseEvent<HTMLButtonElement>) => void',
      description:
        '지정 시 decorator wrapper가 button으로 렌더되어 클릭 가능. 검색/clear 등 input 옆 액션 트리거에 사용.'
    }
  ],
  'search-input': [
    {
      name: 'shape',
      type: "'default' | 'pill' | 'square'",
      defaultValue: "'pill'",
      description: '모서리 형태. 기본 pill (Input의 default와 다름).'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'md'",
      description: 'input 크기. Input과 동일.'
    },
    {
      name: 'onSearch',
      type: '(value: string) => void',
      description:
        '검색 액션. Search 아이콘 클릭 또는 Enter 입력 시 호출. controlled value는 호출자가 관리.'
    }
  ],
  dialog: [
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
      defaultValue: "'md'",
      description:
        'DialogPopup의 max-width. sm=384/md=448/lg=512/xl=576/full=거의 전체. 모바일은 항상 calc(100%-2rem).'
    },
    {
      name: 'shape',
      type: "'default' | 'square'",
      defaultValue: "'default'",
      description: 'default(rounded-lg) / square(rounded-none). DialogPopup에 전달.'
    },
    {
      name: 'from',
      type: "'top' | 'bottom' | 'left' | 'right'",
      defaultValue: "'top'",
      description: 'DialogPopup이 등장하는 방향. 3D rotate + scale 애니메이션 축 결정.'
    }
  ],
  tooltip: [
    {
      title: 'TooltipTrigger',
      description: 'hover/focus 시 tooltip을 트리거하는 element. base UI의 Trigger를 위임.',
      props: [
        {
          name: 'render',
          type: 'React.ReactElement',
          description:
            '실제로 렌더될 element를 지정. 보통 <Button> 등을 넘김 (예: render={<Button>호버</Button>}). children 대신 사용해 trigger element를 fully 교체.'
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'render를 안 쓸 때 trigger 안 내용. 기본 element는 <button> data-slot="tooltip-trigger".'
        }
      ]
    },
    {
      title: 'TooltipContent',
      description: 'tooltip 본체 (popup). 색·외형·위치 prop은 모두 여기에 전달.',
      props: [
        {
          name: 'color',
          type: "'gray' | 'blue' | 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'skyblue' | 'purple' | 'pink' | 'white' | 'gradient-blue'",
          defaultValue: "'gray'",
          description: 'Button과 동일한 12색 시스템. solid 기본값은 dark 룩(cool-grey-11).'
        },
        {
          name: 'theme',
          type: "'solid' | 'outline' | 'soft'",
          defaultValue: "'solid'",
          description:
            'solid는 채움 + 흰 글씨, outline은 흰 배경 + 색 border + 색 글씨, soft는 옅은 배경 + 색 글씨. arrow는 solid에서만 표시.'
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          defaultValue: "'md'",
          description: 'padding + 폰트 크기. sm=11px / md=12px / lg=14px.'
        },
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          defaultValue: "'top'",
          description: 'tooltip이 trigger의 어느 쪽에 나타날지. base UI native prop.'
        },
        {
          name: 'sideOffset',
          type: 'number',
          defaultValue: '4',
          description: 'trigger와 tooltip 사이 간격 (px).'
        },
        {
          name: 'align',
          type: "'start' | 'center' | 'end'",
          defaultValue: "'center'",
          description: 'side 축에 직교한 정렬.'
        }
      ]
    }
  ],
  select: [
    {
      title: 'Select (root)',
      description: 'shape를 root에서 받아 Trigger와 Content가 함께 따르도록 context로 공유.',
      props: [
        {
          name: 'shape',
          type: "'default' | 'pill' | 'square'",
          defaultValue: "'default'",
          description:
            'Trigger와 Content 둘 다 적용. pill 트리거 → 더 둥근 popup, square 트리거 → 모서리 살린 popup.'
        }
      ]
    },
    {
      title: 'SelectTrigger',
      description: 'select가 닫혀있을 때 보이는 트리거. Button과 동일한 color × theme 12×3 매트릭스.',
      props: [
        {
          name: 'color',
          type: "'gray' | 'blue' | 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'skyblue' | 'purple' | 'pink' | 'white' | 'gradient-blue'",
          defaultValue: "'gray'",
          description:
            'Trigger의 border/text/focus 톤을 결정. Button과 같은 12색.'
        },
        {
          name: 'theme',
          type: "'solid' | 'outline' | 'soft'",
          defaultValue: "'outline'",
          description:
            'solid는 채움(흰 글씨), outline은 border만(기본), soft는 옅은 색 배경.'
        },
        {
          name: 'shape',
          type: "'default' | 'pill' | 'square'",
          description: 'Select root의 shape를 override할 때만 사용. 미지정 시 context를 따름.'
        },
        {
          name: 'size',
          type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
          defaultValue: "'md'",
          description: 'h7~h14 + 패딩 + typo-m12~m18. Input의 size 매핑과 동일.'
        },
        {
          name: 'decorator',
          type: 'React.ReactNode',
          description:
            'trigger 시작 위치(왼쪽)에 표시할 데코레이터. 보통 아이콘. 위치는 항상 start (chevron이 end를 차지하므로 end는 안 받음).'
        }
      ]
    },
    {
      title: 'SelectContent',
      description: '드롭다운 popup. 외형 prop은 거의 없고 base UI native 위치 prop만 받음.',
      props: [
        {
          name: 'side',
          type: "'top' | 'right' | 'bottom' | 'left'",
          defaultValue: "'bottom'",
          description: 'popup이 trigger의 어느 쪽에 나타날지.'
        },
        {
          name: 'sideOffset',
          type: 'number',
          defaultValue: '4',
          description: 'trigger와 popup 사이 간격 (px).'
        },
        {
          name: 'align',
          type: "'start' | 'center' | 'end'",
          defaultValue: "'center'",
          description: 'side 축에 직교한 정렬.'
        },
        {
          name: 'alignItemWithTrigger',
          type: 'boolean',
          defaultValue: 'false',
          description:
            'true면 선택된 아이템이 trigger 위치와 정확히 일치해 열림(native select 느낌).'
        }
      ]
    },
    {
      title: 'SelectItem',
      description: '드롭다운 옵션. value는 필수.',
      props: [
        {
          name: 'value',
          type: 'string',
          description: '아이템 선택 시 form value로 들어가는 값. 필수.'
        }
      ]
    }
  ],
  spinner: [
    {
      name: 'color',
      type: "'gray' | 'blue' | 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'skyblue' | 'purple' | 'pink' | 'white' | 'gradient-blue'",
      defaultValue: "'blue'",
      description:
        '회전하는 link border의 색을 결정합니다. Button의 12색과 동일 (gradient-blue는 단색 fallback).'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'md'",
      description: '12/16/24/32/48 px 정사각형. border 두께도 함께 스케일.'
    }
  ],
  skeleton: [
    {
      name: 'variant',
      type: "'rect' | 'text' | 'circle'",
      defaultValue: "'rect'",
      description:
        'rect는 카드/패널, text는 한 줄 텍스트(h-4 자동), circle은 아바타(aspect 1:1) placeholder.'
    },
    {
      name: 'animation',
      type: "'pulse' | 'none'",
      defaultValue: "'pulse'",
      description: 'pulse는 Tailwind animate-pulse, none은 정적. 화면 다수 노출 시 none으로 끄기.'
    },
    {
      name: 'className',
      type: 'string',
      description:
        '높이/너비는 prop으로 받지 않고 className의 h-* / w-*로 자유롭게 지정 (variant=circle은 width만 — aspect로 height 자동).'
    }
  ],
  separator: [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: '구분선 방향. vertical은 부모의 높이를 self-stretch로 따름.'
    },
    {
      name: 'tone',
      type: "'muted' | 'strong' | 'accent'",
      defaultValue: "'muted'",
      description:
        'muted(cool-grey-04) / strong(cool-grey-06) / accent(primary-blue-1). 일반적인 구분선은 muted.'
    },
    {
      name: 'thickness',
      type: "'thin' | 'medium' | 'thick'",
      defaultValue: "'thin'",
      description: 'thin(1px) / medium(2px) / thick(4px). 보통 thin이 충분.'
    }
  ],
  // switch: Style 4축 외 특이 prop 없음 — entry 자체 생략 (Props 섹션 안 그려짐)
  // radio-group: Style 4축 + 표준 form 패턴(value/defaultValue/onValueChange/disabled)만 — entry 생략
  checkbox: [
    {
      name: 'indeterminate',
      type: 'boolean',
      description: 'true면 가운데 가로줄(─) indicator로 부분 선택 상태 표시. 체크 색상도 함께 발동.'
    }
  ],
  textarea: [
    {
      name: 'shape',
      type: "'default' | 'pill' | 'square'",
      defaultValue: "'default'",
      description: '모서리 형태를 결정합니다. pill은 rounded-3xl로 부드러운 둥근 형태.'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'md'",
      description: 'min-height + padding + 폰트 크기를 결정합니다. field-sizing-content로 내용에 맞춰 자랍니다.'
    },
    {
      name: 'maxLength',
      type: 'number',
      description:
        '지정 시 우측 하단에 자동 counter(현재길이/maxLength) 표시. 값이 controlled(value)일 때만 길이가 정확합니다.'
    }
  ],
  label: [
    {
      name: 'variant',
      type: "'default' | 'required' | 'optional'",
      defaultValue: "'default'",
      description:
        'required는 children 뒤에 자동으로 *를 ui-red 색으로 표시, optional은 (선택) 보조 텍스트를 cool-grey-07로 표시합니다.'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'md'",
      description: 'typo-sb11 ~ typo-sb18에 매핑되어 Input 사이즈와 시각 정렬됩니다.'
    },
    {
      name: 'requiredText',
      type: 'React.ReactNode',
      defaultValue: "'*'",
      description:
        'required variant의 표식. i18n이나 시각 커스텀 시 ReactNode로 override합니다 (예: requiredText="필수").'
    },
    {
      name: 'optionalText',
      type: 'React.ReactNode',
      defaultValue: "'(선택)'",
      description:
        'optional variant의 보조 텍스트. 영문 화면에서는 optionalText="(Optional)" 등으로 override합니다.'
    },
    {
      name: 'htmlFor',
      type: 'string',
      description:
        '연결할 input의 id. label 클릭 시 해당 input이 focus되고 스크린리더에 input의 이름으로 전달됩니다.'
    }
  ]
}

const PropsTable = ({ props }: { props: PropDoc[] }) => (
  <div className="border-border-default overflow-hidden rounded-lg border">
    <table className="w-full table-fixed text-left">
      <thead className="bg-bg-subtle">
        <tr className="typo-sb12 text-fg-muted">
          <th className="w-32 px-3 py-2">Prop</th>
          <th className="w-64 px-3 py-2">Type</th>
          <th className="w-24 px-3 py-2">Default</th>
          <th className="px-3 py-2">Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map((prop) => (
          <tr key={prop.name} className="border-border-default border-t align-top">
            <td className="px-3 py-2">
              <code className="typo-mono-m12 text-fg-strong">{prop.name}</code>
            </td>
            <td className="px-3 py-2">
              <code className="typo-mono-m12 text-fg-default break-words">{prop.type}</code>
            </td>
            <td className="px-3 py-2">
              {prop.defaultValue ? (
                <code className="typo-mono-m12 text-fg-default">{prop.defaultValue}</code>
              ) : (
                <span className="text-fg-muted typo-mono-m12">-</span>
              )}
            </td>
            <td className="text-description px-3 py-2">{prop.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

/** Style 카드 / Variant 카드에서 이미 노출되는 prop은 Props 표에서 제외 */
const STYLE_PROP_NAMES = new Set(['color', 'theme', 'shape', 'size', 'variant'])

const stripStyleProps = (props: PropDoc[]): PropDoc[] =>
  props.filter((p) => !STYLE_PROP_NAMES.has(p.name))

/** 사전 검사 — ComponentPropsDocs가 실제로 비어있지 않은 표를 그릴지 미리 판단 */
export const hasVisiblePropsDocs = (name: string): boolean => {
  const entry = PROPS_DOCS[name]
  if (!entry || entry.length === 0) return false
  if (isPropGroups(entry)) {
    return entry.some((g) => stripStyleProps(g.props).length > 0)
  }
  return stripStyleProps(entry).length > 0
}

export const ComponentPropsDocs = ({ name }: { name: string }) => {
  const entry = PROPS_DOCS[name]

  if (!entry || entry.length === 0) return null

  if (isPropGroups(entry)) {
    const filteredGroups = entry
      .map((g) => ({ ...g, props: stripStyleProps(g.props) }))
      .filter((g) => g.props.length > 0)
    if (filteredGroups.length === 0) return null
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-8">
          {filteredGroups.map((group, idx) => (
            <div
              key={group.title}
              className={
                idx > 0
                  ? 'border-border-default flex flex-col gap-3 border-t pt-8'
                  : 'flex flex-col gap-3'
              }
            >
              <div className="flex items-baseline gap-3">
                <span className="bg-primary-blue-1 inline-block h-3.5 w-1 rounded-sm" />
                <h4 className="typo-b16 text-fg-strong">{group.title}</h4>
              </div>
              {group.description && <p className="text-description -mt-1">{group.description}</p>}
              <PropsTable props={group.props} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const filtered = stripStyleProps(entry)
  if (filtered.length === 0) return null

  return <PropsTable props={filtered} />
}
