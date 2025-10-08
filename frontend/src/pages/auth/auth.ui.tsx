import AuthFormFeature from '@/features/auth'
import LocaleToggleFeature from '@/features/locale-toggle'
import ThemeToggleFeature from '@/features/theme-toggle'

import { PageCenterWrapper } from '@/shared/ui'

function AuthPage() {
  return (
    <PageCenterWrapper>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <AuthFormFeature />
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-3">
        <LocaleToggleFeature />
        <ThemeToggleFeature />
      </div>
    </PageCenterWrapper>
  )
}

export default AuthPage
