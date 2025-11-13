import * as z from 'zod'

export const formSchema = z.object({
  name: z.string().nonempty('Наименование не может быть пустым'),
  price: z.string().nonempty('Цена не может быть отрицательной'),
  categoryId: z.number('Категория не может быть пустой'),
  image: z.string().optional(),
})
