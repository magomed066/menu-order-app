import { useTranslation } from 'react-i18next'

import { cn } from '@/shared/lib/utils'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
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
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    {t('forgotPassword')}
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">{t('login')}</Button>
                <FieldDescription className="text-center">
                  {t('doNotHaveAnAccount')} <a href="#">{t('signUp')}</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthFormFeature
