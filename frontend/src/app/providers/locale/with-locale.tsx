import i18next from 'i18next'
import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'

import { translationEn } from '@/shared/lib/locale/en'
import { translationRu } from '@/shared/lib/locale/ru'

i18next.init({
  lng: 'ru', // default language
  fallbackLng: 'ru',
  interpolation: { escapeValue: false }, // React already does escaping
  resources: {
    en: translationEn,
    ru: translationRu,
  },
})

export const withLocale = (component: () => ReactNode) => () => {
  return <I18nextProvider i18n={i18next}>{component()}</I18nextProvider>
}
