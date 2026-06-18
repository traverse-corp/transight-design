export interface Pagenations {
  page: number
  totalPage: number
  size: number
  className?: string
  onPageChange: (page: number, inq: number) => void
}
