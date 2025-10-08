import compose from 'compose-function'

import { withLocale } from './locale/with-locale'
import { withRouter } from './router/with-router'
import { withTheme } from './theme/with-theme'

// Create a configured theme provider
const withConfiguredTheme = (component: () => React.ReactNode) =>
  withTheme(component, {
    defaultTheme: 'light',
    storageKey: 'vite-ui-theme',
  })

const withProviders = compose(withRouter, withConfiguredTheme, withLocale)

export default withProviders
