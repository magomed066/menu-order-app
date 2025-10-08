import { Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui'

function LocaleToggleFeature() {
  const { i18n } = useTranslation()

  const handleChangeLangyage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
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
