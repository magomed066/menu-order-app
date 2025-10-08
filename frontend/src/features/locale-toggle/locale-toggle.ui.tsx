import { Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

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
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeLangyage('ru')}>
          Русский
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LocaleToggleFeature
