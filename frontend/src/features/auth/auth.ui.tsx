import { useTranslation } from 'react-i18next'

import { cn } from '@/shared/lib/utils'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
} from '@/shared/ui'

function AuthFormFeature() {
  const { t } = useTranslation(['auth'])

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('loginWelcome')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder={t('inputPassword')}
                />
              </Field>
              <Field>
                <Button type="submit">{t('login')}</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthFormFeature
