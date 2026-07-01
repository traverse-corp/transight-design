import { SyncLoader } from 'react-spinners'

/**
 * Suspense fallback 전용 컴포넌트
 * Loading 컴포넌트와 달리 어두운 오버레이 없이 중앙에 스피너만 표시
 * (Loading은 isFetching > 0일 때 전체화면 bg-black/30 오버레이를 표시하므로 Suspense fallback으로 부적합)
 */
const SuspenseFallback = () => {
  return (
    <div className='flex-center min-h-dvh w-full'>
      <SyncLoader
        color='var(--color-primary-blue-1)'
        aria-label='Loading Spinner'
        data-testid='suspense-loader'
        margin={15}
      />
    </div>
  )
}

export default SuspenseFallback
