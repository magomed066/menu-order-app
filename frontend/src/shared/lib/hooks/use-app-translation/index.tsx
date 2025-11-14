import { type UseTranslationResponse, useTranslation } from 'react-i18next'

import type { Resources } from '../../types'

export type AllTranslationKeys = {
  [K in keyof Resources]: `${Extract<K, string>}:${Extract<keyof Resources[K], string>}`
}[keyof Resources]

function useAppTranslation(): { t: (key: AllTranslationKeys) => string }
function useAppTranslation(ns: keyof Resources): {
  t: (key: keyof Resources[typeof ns]) => string
}
function useAppTranslation(
  ns: (keyof Resources)[]
): { t: (key: AllTranslationKeys) => string } & UseTranslationResponse<
  typeof ns,
  undefined
>
function useAppTranslation(ns?: keyof Resources | (keyof Resources)[]): any {
  const defaultNS: (keyof Resources)[] = ['common', 'auth', 'menu', 'pages']
  const translation = useTranslation(ns ?? defaultNS)

  if (!ns || Array.isArray(ns)) {
    // When using multiple namespaces, cast t to accept all translation keys
    return {
      ...translation,
      t: translation.t as (key: AllTranslationKeys) => string,
    }
  }

  return translation
}

export { useAppTranslation }
