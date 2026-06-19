import { Input } from '@transight-design/ui/components/input'
import { Mail } from 'lucide-react'

interface PreviewProps {
  selections?: Record<string, string>
}

type Size = NonNullable<Parameters<typeof Input>[0]['size']>
type DecoDir = NonNullable<Parameters<typeof Input>[0]['decoDir']>

export const Preview = ({ selections = {} }: PreviewProps) => {
  const decorator = selections.decorator ?? 'none'
  const decoDir: DecoDir = decorator === 'end' ? 'end' : 'start'

  return (
    <Input
      size={(selections.size as Size) ?? 'md'}
      decoDir={decoDir}
      placeholder="Email"
      decorator={decorator === 'none' ? undefined : <Mail className="h-4 w-4" />}
      className="w-80"
    />
  )
}
