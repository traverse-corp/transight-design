import { Pagination, PaginationContent } from '@/components/pagination'
import type { Pagenations } from '@/lib/pagination-types'
import { twMerge } from 'tailwind-merge'

/**
 * 페이지네이션 컴포넌트
 * @param {number} page - 현재 페이지
 * @param {number} totalPage - 전체 페이지 수
 * @param {number} size - 한 페이지에 표시할 데이터 수
 * @param {function} onPageChange - 페이지가 변경될 때 마다 실행할 함수
 */
function Paginations({ className }: Pagenations) {
  return (
    <div className={twMerge('w-full', className)}>
      <Pagination>
        <PaginationContent className='flex-center w-full select-none'></PaginationContent>
      </Pagination>
    </div>
  )
}

export default Paginations
