import i18next, { type Resources } from 'i18next'
import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'

import { translationEn } from '@/shared/lib/locale/en'
import { translationRu } from '@/shared/lib/locale/ru'

const resources = {
  en: translationEn,
  ru: translationRu,
} as const satisfies Record<string, Resources>

const getSavedLanguage = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('i18nextLng') || 'ru'
  }
  return 'ru'
}

i18next.init({
  lng: getSavedLanguage(),
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
  resources,
  // defaultNS: 'common',
  // ns: ['common', 'menu', 'auth'],
})

// Listen for language changes and save to localStorage
i18next.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('i18nextLng', lng)
  }
})

export const withLocale = (component: () => ReactNode) => () => {
  return <I18nextProvider i18n={i18next}>{component()}</I18nextProvider>
}
