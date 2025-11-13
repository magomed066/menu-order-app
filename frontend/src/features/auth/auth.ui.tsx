import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

import { useLoginMutation, useUserStore } from '@/entities/auth'

import { ROUTES } from '@/shared/lib/config'
import { showToast } from '@/shared/lib/toast'
import { cn } from '@/shared/lib/utils'

import {
  ButtonLoading,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from '@/shared/ui'

import { formSchema } from './validation'

function AuthFormFeature() {
  const { t } = useTranslation(['auth'])
  const { setUser, setTokens, accessToken } = useUserStore()
  const navigate = useNavigate()

  const { mutateAsync, isPending } = useLoginMutation(
    (data) => {
      const { user, token } = data
      setUser(user)
      setTokens(token)
      navigate(ROUTES.DASHBOARD)
    },
    (err) => {
      showToast('error', String(err), {
        description: t('loginError'),
      })
    }
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutateAsync(data)
  }

  useEffect(() => {
    if (accessToken) {
      navigate(ROUTES.DASHBOARD)
    }
  }, [accessToken])

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('loginWelcome')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ fieldState, field }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="m@example.com"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ fieldState, field }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder={t('inputPassword')}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <ButtonLoading type="submit" loading={isPending}>
                  {t('login')}
                </ButtonLoading>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthFormFeature
