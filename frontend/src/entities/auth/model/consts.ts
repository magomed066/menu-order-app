import { type LoginUser } from '@/shared/api/services'

export const AUTH_ACCESS_TOKEN_KEY = 'accessToken'

export const authQueryKeys = {
  login: () => ['login'],
}

export const loginFormInitialValues: LoginUser = {
  email: '',
  password: '',
}

export const AuthErrMessages: Record<string, string> = {
  'Wrong password': 'Ваш пароль неверный. Введите верный пароль.',
  'User not found': 'Пользователь с таким Email не существует.',
}
