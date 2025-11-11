export type LocaleKeys = 'en' | 'ru'

export interface AuthResources {
  doNotHaveAnAccount: string
  forgotPassword: string
  signUp: string
  login: string
  email: string
  password: string
  loginWelcome: string
  inputPassword: string
}

export interface CommonResources {
  save: string
  cancel: string
  dark: string
  light: string
  system: string
}

export interface MenuResources {
  menu: string
  category: string
}

// Merge all resources
export interface Resources {
  auth: AuthResources
  common: CommonResources
  menu: MenuResources
}
