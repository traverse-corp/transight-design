import { Tabs, TabsList, TabsTrigger, TabsContent } from '@transight-design/ui/components/tabs'

interface PreviewProps {
  selections?: Record<string, string>
}

type Shape = NonNullable<Parameters<typeof TabsList>[0]['shape']>
type Theme = NonNullable<Parameters<typeof TabsList>[0]['theme']>
type Size = NonNullable<Parameters<typeof TabsList>[0]['size']>
type Color = NonNullable<Parameters<typeof TabsList>[0]['color']>

export const Preview = ({ selections = {} }: PreviewProps) => (
  <Tabs defaultValue='account' className='w-1/2 min-w-72'>
    <TabsList
      shape={(selections.shape as Shape) ?? undefined}
      theme={(selections.theme as Theme) ?? undefined}
      size={(selections.size as Size) ?? undefined}
      color={(selections.color as Color) ?? undefined}
    >
      <TabsTrigger value='account'>계정</TabsTrigger>
      <TabsTrigger value='password'>비밀번호</TabsTrigger>
      <TabsTrigger value='notifications'>알림</TabsTrigger>
    </TabsList>
    <TabsContent value='account' className='py-3'>
      <p>계정 정보를 확인합니다.</p>
    </TabsContent>
    <TabsContent value='password' className='py-3'>
      <p>비밀번호를 변경합니다.</p>
    </TabsContent>
    <TabsContent value='notifications' className='py-3'>
      <p>알림 설정을 관리합니다.</p>
    </TabsContent>
  </Tabs>
)
