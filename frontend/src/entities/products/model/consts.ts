export const PRODUCT_FORMS = {
  CREATE: 'create_product_form',
}

export const productsQueryKeys = {
  all: (search?: string, page?: number, filters?: Record<string, string>) => {
    const key = ['allProducts', search, page]

    return filters
      ? [...key, ...Object.entries(filters).flatMap(([k, v]) => [k, v])]
      : key
  },
}
