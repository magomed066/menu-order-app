import { useAppTranslation } from '@/shared/lib/hooks'

function SelectOrder() {
  const { t } = useAppTranslation()
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border p-8 text-center flex-1">
      <p className="font-medium">{t('pages:selectOrder')}</p>
    </div>
  )
}

export default SelectOrder
