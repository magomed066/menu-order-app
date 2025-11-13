import * as z from 'zod'

export const formSchema = z.object({
  email: z.email('Email должен быть валидным'),
  password: z.string().nonempty('Заполните поле'),
})
