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
  const { t } = useTranslation(['common', 'auth'])

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('auth:loginWelcome')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">{t('auth:email')}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">
                    {t('auth:password')}
                  </FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    {t('auth:forgotPassword')}
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">{t('auth:login')}</Button>
                <FieldDescription className="text-center">
                  {t('auth:doNotHaveAnAccount')}{' '}
                  <a href="#">{t('auth:signUp')}</a>
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
