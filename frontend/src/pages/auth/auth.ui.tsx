import AuthFormFeature from '@/features/auth'
import ThemeToggleFeature from '@/features/theme-toggle'

import { PageCenterWrapper } from '@/shared/ui'

function AuthPage() {
  return (
    <PageCenterWrapper>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <AuthFormFeature />
      </div>

      <div className="absolute top-4 right-4">
        <ThemeToggleFeature />
      </div>
    </PageCenterWrapper>
  )
}

export default AuthPage
