import { Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useAppTranslation } from '@/shared/lib/hooks'
import type { LocaleKeys } from '@/shared/lib/types'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui'

function LocaleToggleFeature() {
  const { i18n } = useTranslation()
  const { t } = useAppTranslation()

  const handleChangeLangyage = (lng: LocaleKeys) => {
    i18n.changeLanguage(lng)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChangeLangyage('en')}>
          {t('pages:language_en')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeLangyage('ru')}>
          {t('pages:language_ru')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LocaleToggleFeature
