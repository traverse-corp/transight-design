'use client'

interface PropDoc {
  name: string
  type: string
  defaultValue?: string
  description: string
}

const PROPS_DOCS: Record<string, PropDoc[]> = {
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
      type: "'default' | 'search' | 'login'",
      defaultValue: "'default'",
      description: '반복해서 쓰는 input 조합을 preset으로 호출합니다.'
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
      description: 'input 앞이나 뒤에 붙일 컴포넌트입니다. 비워두면 decorator 영역을 렌더하지 않습니다.'
    },
    {
      name: 'decoDir',
      type: "'start' | 'end'",
      defaultValue: "'start'",
      description: 'decorator가 있을 때 붙는 방향을 결정합니다.'
    },
    {
      name: 'onSearch',
      type: '(value: string) => void',
      description: 'search variant에서 검색 버튼 클릭 또는 Enter 입력 시 호출됩니다.'
    },
    {
      name: 'capsLockIndicator',
      type: 'React.ReactNode',
      description: 'login variant의 password 입력에서 Caps Lock 상태를 표시할 커스텀 컴포넌트입니다.'
    }
  ]
}

export const ComponentPropsDocs = ({ name }: { name: string }) => {
  const props = PROPS_DOCS[name]

  if (!props) return null

  return (
    <div className="border-cool-grey-04 flex flex-col gap-3 border-t pt-5">
      <div>
        <h3 className="typo-sb14 text-cool-grey-11">Props</h3>
        <p className="text-description mt-1">
          자주 조합하는 스타일은 variant로 묶고, 세부 조정은 아래 props로 직접 제어합니다.
        </p>
      </div>

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
    </div>
  )
}
