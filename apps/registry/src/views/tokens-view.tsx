import { ColorSwatch } from './color-swatch'
import {
  COLOR_GROUPS,
  GRADIENT_SWATCHES,
  SHADOW_SWATCHES
} from '@/lib/token-data'

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className='typo-b18 text-fg-strong mb-4'>{children}</h2>
)

const SubLabel = ({ children }: { children: React.ReactNode }) => (
  <h3 className='typo-sb12 text-fg-muted mb-3 uppercase tracking-wide'>{children}</h3>
)

export const TokensView = () => (
  <div className='flex flex-col gap-12'>
    {/* ── Color ──────────────── */}
    <section>
      <SectionTitle>Color</SectionTitle>
      <p className='text-description mb-6'>
        스와치 hover 시 HEX 표시, 클릭하면 클립보드에 복사됩니다.
      </p>
      <div className='flex flex-col gap-8'>
        {COLOR_GROUPS.map((group) => (
          <div key={group.label}>
            <SubLabel>{group.label}</SubLabel>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {group.swatches.map((s) => (
                <ColorSwatch key={s.name} swatch={s} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ── Gradient ──────────────── */}
    <section>
      <SectionTitle>Gradient</SectionTitle>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {GRADIENT_SWATCHES.map((g) => (
          <div
            key={g.name}
            className='border-border-default overflow-hidden rounded-lg border bg-bg-card'
          >
            <div className={`${g.bgClass} h-32`} />
            <div className='border-border-default border-t px-4 py-3'>
              <p className='typo-sb14 text-fg-strong'>{g.name}</p>
              <p className='typo-mono-r10 text-fg-muted mt-1 truncate'>{g.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ── Shadow ──────────────── */}
    <section>
      <SectionTitle>Shadow</SectionTitle>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {SHADOW_SWATCHES.map((s) => (
          <div key={s.name} className='flex flex-col items-center gap-4 p-6'>
            <div className={`${s.utilityClass} h-24 w-32 rounded-md bg-bg-card`} />
            <div className='text-center'>
              <p className='typo-sb14 text-fg-strong'>{s.name}</p>
              <p className='typo-mono-r10 text-fg-muted mt-1'>{s.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

  </div>
)
