import LocaleToggleFeature from '@/features/locale-toggle'
import ThemeToggleFeature from '@/features/theme-toggle'

function AppActionsWidget() {
  return (
    <div className="absolute top-4 right-4 flex items-center gap-3">
      <LocaleToggleFeature />
      <ThemeToggleFeature />
    </div>
  )
}

export default AppActionsWidget
