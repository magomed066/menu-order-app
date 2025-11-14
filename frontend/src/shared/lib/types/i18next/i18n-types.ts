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
  loginError: string
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

export interface ProductsResources {
  name: string
  category: string
  price: string
  image: string
  description: string
}

export interface PagesResources {
  main: string
  cart: string
  admin: string
  dashboard: string
  products: string
  orders: string
  analytics: string
  menuTitle: string
  cartTitle: string
  addToCart: string
  noProducts: string
  addProductHint: string
  selectOrder: string
  searchMenuPlaceholder: string
  addProduct: string
  addProductDialogTitle: string
  orderPlaced: string
  orderPlaceError: string
  emptyCart: string
  table: string
  guestCount: string
  payment: string
  payment_online: string
  payment_cash: string
  payment_card_waiter: string
  total: string
  placeOrder: string
  delete: string
  order: string
  statusUpdated: string
  tableShort: string
  delivery: string
  orderTime: string
  orderedItems: string
  toCooking: string
  toReady: string
  toCompleted: string
  language_en: string
  language_ru: string
  all: string
  status_pending: string
  status_cooking: string
  status_completed: string
  status_cancelled: string
  status_ready: string
  dropzone_hint: string
  dropzone_upload_image: string
  dropzone_upload_images: string
}

// Merge all resources
export interface Resources {
  auth: AuthResources
  common: CommonResources
  menu: MenuResources
  products: ProductsResources
  pages: PagesResources
}
