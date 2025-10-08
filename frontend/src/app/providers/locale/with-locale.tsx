import i18next, { type Resources } from 'i18next'
import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'

import { translationEn } from '@/shared/lib/locale/en'
import { translationRu } from '@/shared/lib/locale/ru'

const resources = {
  en: translationEn,
  ru: translationRu,
} as const satisfies Record<string, Resources>

i18next.init({
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
  resources,
})

export const withLocale = (component: () => ReactNode) => () => {
  return <I18nextProvider i18n={i18next}>{component()}</I18nextProvider>
}
