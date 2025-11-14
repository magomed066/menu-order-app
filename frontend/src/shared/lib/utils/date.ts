import { format } from 'date-fns'

export const formattedDate = (date?: Date | string | number): string => {
  try {
    const value = date ? new Date(date) : new Date()

    // Проверка на валидность даты
    if (isNaN(value.getTime())) {
      return ''
    }

    return format(value, 'dd.MM.yyyy HH:mm')
  } catch (error) {
    return ''
  }
}
