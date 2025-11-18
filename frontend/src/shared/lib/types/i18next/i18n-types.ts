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

export interface CategoriesResources {
  disabled: string
  enabled: string
  noCategories: string
  showCategory: string
  categories: string
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

export interface PagesResources {
  main: string
  cart: string
  admin: string
  dashboard: string
  products: string
  categories: string
  orders: string
  analytics: string
  menuTitle: string
  cartTitle: string
  addToCart: string
  noProducts: string
  addProductHint: string
  selectOrder: string
  searchMenuPlaceholder: string
  noCategories: string
  addProduct: string
  addProductDialogTitle: string
  editProductDialogTitle: string
  addCategory: string
  addCategoryDialogTitle: string
  editCategoryDialogTitle: string
  orderPlaced: string
  productSaved: string
  categoriesOrderUpdated: string
  categorySaved: string
  orderPlaceError: string
  emptyCart: string
  table: string
  guestCount: string
  orderType: string
  orderType_dine_in: string
  orderType_delivery: string
  customerName: string
  customerPhone: string
  deliveryAddress: string
  addressId: string
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

export interface ProductsResources {
  name: string
  category: string
  price: string
  image: string
  description: string
  isActive: string
}

// Merge all resources
export interface Resources {
  auth: AuthResources
  categories: CategoriesResources
  common: CommonResources
  menu: MenuResources
  pages: PagesResources
  products: ProductsResources
}
