import AuthFormFeature from '@/features/auth'

import AppActionsWidget from '@/widgets/app-actions'

import { PageCenterWrapper } from '@/shared/ui'

function AuthPage() {
  return (
    <PageCenterWrapper>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <AuthFormFeature />
      </div>

      <AppActionsWidget />
    </PageCenterWrapper>
  )
}

export default AuthPage
