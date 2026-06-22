import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { STYLE_META } from '@/lib/registry'
import { TokensView } from '@/views/tokens-view'
import { TypoView } from '@/views/typo-view'
import { FlexView } from '@/views/flex-view'
import { StylesNav } from '../../_components/styles-nav'

/** URL slug → registry item name */
const SLUG_TO_ITEM: Record<string, string> = {
  tokens: 'style-tokens',
  typography: 'style-typography',
  flex: 'style-flex'
}

const VIEWS: Record<string, () => ReactNode> = {
  'style-tokens': () => <TokensView />,
  'style-typography': () => <TypoView />,
  'style-flex': () => <FlexView />
}

export const generateStaticParams = (): { name: string }[] =>
  Object.keys(SLUG_TO_ITEM).map((name) => ({ name }))

interface PageProps {
  params: Promise<{ name: string }>
}

const StyleBrowsePage = async ({ params }: PageProps) => {
  const { name } = await params
  const itemName = SLUG_TO_ITEM[name]
  if (!itemName) notFound()

  const meta = STYLE_META[itemName]
  const View = VIEWS[itemName]
  if (!meta || !View) notFound()

  return (
    <div className='mx-auto flex h-screen max-w-7xl gap-10 px-6'>
      <StylesNav />

      <div className='h-screen min-w-0 flex-1 overflow-y-auto py-10'>
        <header className='mb-8'>
          <h1 className='typo-b24 text-cool-grey-11'>{meta.displayName}</h1>
          <p className='text-description mt-1'>{meta.description}</p>
        </header>

        <View />
      </div>
    </div>
  )
}

export default StyleBrowsePage
