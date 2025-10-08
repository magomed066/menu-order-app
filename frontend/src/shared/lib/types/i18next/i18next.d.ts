import type { AuthResources, CommonResources, Resources } from './i18n-types'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: Resources
  }
}
