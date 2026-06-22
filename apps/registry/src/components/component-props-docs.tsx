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
      name: 'appearance',
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
      name: 'appearance',
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
      name: 'variant',
      type: "'default' | 'search' | 'password'",
      defaultValue: "'default'",
      description:
        '자주 쓰는 input 조합을 preset으로 호출합니다. search는 pill + 시작 decorator(검색 아이콘), password는 type=password + Caps Lock 인디케이터를 자동 적용합니다.'
    },
    {
      name: 'shape',
      type: "'default' | 'pill' | 'square'",
      defaultValue: "'default'",
      description: '모서리 형태를 결정합니다. preset의 shape보다 우선합니다.'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'md'",
      description: 'input 높이, 패딩, 텍스트 크기를 결정합니다.'
    },
    {
      name: 'decorator',
      type: 'React.ReactNode',
      description:
        'input 앞/뒤에 붙일 컴포넌트(아이콘 등). preset의 decorator를 덮어씁니다. 미지정 시 preset 기본값이 사용됩니다.'
    },
    {
      name: 'decoDir',
      type: "'start' | 'end'",
      defaultValue: "'start'",
      description: 'decorator가 붙는 방향을 결정합니다.'
    },
    {
      name: 'onDecoratorClick',
      type: '(e: MouseEvent<HTMLButtonElement>) => void',
      description:
        '지정 시 decorator wrapper가 button으로 렌더되어 클릭 가능해집니다. 검색 실행, 비밀번호 보기 토글 등 input 옆 액션 트리거에 사용합니다.'
    },
    {
      name: 'capsLockIndicator',
      type: 'boolean | React.ReactNode',
      description:
        'Caps Lock 활성 시 표시 여부/내용. password preset에서 기본 활성. false면 숨김, ReactNode면 커스텀 인디케이터로 교체.'
    },
    {
      name: 'aria-invalid',
      type: 'boolean',
      description:
        '에러 표시 트리거. true면 wrapper border가 자동으로 빨간색이 됩니다. 별도 error prop 없이 표준 a11y 속성을 사용합니다.'
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
      name: 'open',
      type: 'boolean',
      description: 'controlled open 상태. onOpenChange와 함께 사용. Dialog root에 전달.'
    },
    {
      name: 'defaultOpen',
      type: 'boolean',
      description: 'uncontrolled 초기 open 상태.'
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      description: 'open 상태 변경 콜백.'
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
          name: 'appearance',
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
  switch: [
    {
      name: 'color',
      type: "'gray' | 'blue' | 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'skyblue' | 'purple' | 'pink' | 'white' | 'gradient-blue'",
      defaultValue: "'blue'",
      description:
        'on 상태일 때 track 색을 결정합니다. Button의 solid 색상 시스템과 동일한 12색. off 상태는 cool-grey-05 고정.'
    },
    {
      name: 'shape',
      type: "'default' | 'square'",
      defaultValue: "'default'",
      description:
        'default(rounded-full pill) / square(rounded-md). switch는 본질적으로 pill이라 두 형태만 의미 있음.'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'md'",
      description:
        'track width/height + thumb 크기 + on/off translate 거리를 함께 결정합니다.'
    },
    {
      name: 'checked',
      type: 'boolean',
      description: '현재 on/off 상태 (controlled). onCheckedChange와 함께 사용.'
    },
    {
      name: 'onCheckedChange',
      type: '(checked: boolean) => void',
      description: '상태 변경 콜백.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'true면 클릭 비활성 + opacity 40%.'
    }
  ],
  'radio-group': [
    {
      name: 'color',
      type: "'gray' | 'blue' | 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'skyblue' | 'purple' | 'pink' | 'white' | 'gradient-blue'",
      defaultValue: "'blue'",
      description:
        '선택된 radio의 ring(테두리) + inner dot 색을 결정합니다. Button의 solid 색상 시스템과 동일한 12색.'
    },
    {
      name: 'shape',
      type: "'circle' | 'square'",
      defaultValue: "'circle'",
      description: 'circle(rounded-full) / square(rounded-none). radio는 본질적으로 원형이라 두 형태만 의미 있음.'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'md'",
      description: 'radio 크기 — 14/16/18/22/26px 정사각형. inner dot도 함께 스케일.'
    },
    {
      name: 'value',
      type: 'string',
      description: '현재 선택된 값 (controlled). onValueChange와 함께 사용.'
    },
    {
      name: 'defaultValue',
      type: 'string',
      description: '초기 선택 값 (uncontrolled).'
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      description: '선택 변경 콜백.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'true면 그룹 내 모든 radio 비활성.'
    }
  ],
  checkbox: [
    {
      name: 'color',
      type: "'gray' | 'blue' | 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'skyblue' | 'purple' | 'pink' | 'white' | 'gradient-blue'",
      defaultValue: "'blue'",
      description:
        '체크된 상태의 배경/border 색을 결정합니다. Button의 solid 색상 시스템과 동일한 12색.'
    },
    {
      name: 'shape',
      type: "'default' | 'square' | 'circle'",
      defaultValue: "'default'",
      description: 'default(rounded-sm) / square(rounded-none) / circle(rounded-full) 모서리 형태.'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "'md'",
      description: 'checkbox 크기 — 14/16/18/22/26px 정사각형. indicator도 같이 스케일됩니다.'
    },
    {
      name: 'checked',
      type: 'boolean',
      description: 'controlled 체크 상태. onCheckedChange와 함께 사용.'
    },
    {
      name: 'defaultChecked',
      type: 'boolean',
      description: 'uncontrolled 초기 체크 상태.'
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      description: 'true면 가운데 가로줄(─) indicator로 부분 선택 상태 표시. 체크 색상도 함께 발동.'
    },
    {
      name: 'onCheckedChange',
      type: '(checked: boolean) => void',
      description: '체크 상태 변경 콜백.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'true면 클릭 비활성 + opacity 50%.'
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
    },
    {
      name: 'aria-invalid',
      type: 'boolean',
      description: '에러 표시 트리거. true면 border가 자동으로 빨간색이 됩니다.'
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
  <div className="border-cool-grey-04 overflow-hidden rounded-lg border">
    <table className="w-full table-fixed text-left">
      <thead className="bg-cool-grey-01">
        <tr className="typo-sb12 text-cool-grey-07">
          <th className="w-32 px-3 py-2">Prop</th>
          <th className="w-64 px-3 py-2">Type</th>
          <th className="w-24 px-3 py-2">Default</th>
          <th className="px-3 py-2">Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map((prop) => (
          <tr key={prop.name} className="border-cool-grey-04 border-t align-top">
            <td className="px-3 py-2">
              <code className="typo-mono-m12 text-cool-grey-11">{prop.name}</code>
            </td>
            <td className="px-3 py-2">
              <code className="typo-mono-m12 text-cool-grey-08 break-words">{prop.type}</code>
            </td>
            <td className="px-3 py-2">
              {prop.defaultValue ? (
                <code className="typo-mono-m12 text-cool-grey-08">{prop.defaultValue}</code>
              ) : (
                <span className="text-cool-grey-06 typo-mono-m12">-</span>
              )}
            </td>
            <td className="text-description px-3 py-2">{prop.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export const ComponentPropsDocs = ({ name }: { name: string }) => {
  const entry = PROPS_DOCS[name]

  if (!entry || entry.length === 0) return null

  return (
    <div className="border-cool-grey-04 flex flex-col gap-3 border-t pt-5">
      <div>
        <h3 className="typo-sb14 text-cool-grey-11">Props</h3>
        <p className="text-description mt-1">
          자주 조합하는 스타일은 variant로 묶고, 세부 조정은 아래 props로 직접 제어합니다.
        </p>
      </div>

      {isPropGroups(entry) ? (
        <div className="flex flex-col gap-5">
          {entry.map((group) => (
            <div key={group.title} className="flex flex-col gap-2">
              <div>
                <h4 className="typo-sb13 text-cool-grey-11">{group.title}</h4>
                {group.description && (
                  <p className="text-description mt-0.5">{group.description}</p>
                )}
              </div>
              <PropsTable props={group.props} />
            </div>
          ))}
        </div>
      ) : (
        <PropsTable props={entry} />
      )}
    </div>
  )
}
