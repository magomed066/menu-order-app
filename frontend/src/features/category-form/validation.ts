import * as z from 'zod'

export const formSchema = z.object({
  name: z.string().nonempty('Наименование не может быть пустым'),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
})

