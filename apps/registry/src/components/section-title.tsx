import type { ReactNode } from 'react'

interface SectionTitleProps {
  children: ReactNode
  /** 타이틀 우측에 같은 줄로 노출되는 보조 설명 */
  description?: ReactNode
}

/** 컴포넌트 상세 페이지의 섹션 헤더 — Style / Variant / Props 등에 공통 사용 */
export const SectionTitle = ({ children, description }: SectionTitleProps) => (
  <header className='mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1'>
    <h2 className='typo-sb12 text-fg-muted uppercase tracking-wide'>{children}</h2>
    {description && <p className='typo-r12 text-fg-muted typo-m12'>{description}</p>}
  </header>
)

/** 섹션 본문을 감싸는 카드 박스 — bg-card는 .dark에서 자동 스왑 */
export const SectionCard = ({ children }: { children: ReactNode }) => (
  <div className='border-border-default bg-bg-card rounded-lg border p-8'>{children}</div>
)
