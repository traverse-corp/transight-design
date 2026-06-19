import { Tabs, TabsList, TabsTrigger, TabsContent } from '@transight-design/ui/components/tabs'

export const Preview = () => (
  <Tabs defaultValue='account' className='w-80'>
    <TabsList>
      <TabsTrigger value='account'>계정</TabsTrigger>
      <TabsTrigger value='password'>비밀번호</TabsTrigger>
      <TabsTrigger value='notifications'>알림</TabsTrigger>
    </TabsList>
    <TabsContent value='account' className='py-3'>
      <p className='text-body'>계정 정보를 확인합니다.</p>
    </TabsContent>
    <TabsContent value='password' className='py-3'>
      <p className='text-body'>비밀번호를 변경합니다.</p>
    </TabsContent>
    <TabsContent value='notifications' className='py-3'>
      <p className='text-body'>알림 설정을 관리합니다.</p>
    </TabsContent>
  </Tabs>
)
