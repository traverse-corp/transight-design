'use client'

import { useEffect, useState, type ReactElement, type ReactNode } from 'react'
import i18next, { type i18n } from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'

/**
 * 문서 사이트용 i18n 스텁.
 * 컴포넌트들이 useTranslation()을 호출해도 실제 번역 없이 키를 그대로 반환하므로
 * 안전하게 렌더링된다. 실제 사용자 앱에서는 자체 번역 리소스로 대체된다.
 */
const initI18n = (): i18n => {
  if (!i18next.isInitialized) {
    void i18next.use(initReactI18next).init({
      lng: 'ko',
      fallbackLng: 'ko',
      resources: { ko: { translation: {} } },
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
      // 키 누락 시 키 자체를 반환 — 컴포넌트가 "복사", "TM_034" 같은 문자열을 보여줘도 안 깨짐
      returnNull: false,
      returnEmptyString: false
    })
  }
  return i18next as unknown as i18n
}

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initI18n()
    setReady(true)
  }, [])

  if (!ready) return null
  const Provider = I18nextProvider as unknown as (props: {
    i18n: i18n
    children: ReactNode
  }) => ReactElement

  return <Provider i18n={initI18n()}>{children}</Provider>
}
