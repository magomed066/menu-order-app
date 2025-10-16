export type Props = {
  data: {
    status: string
    label: string
    orders: {
      number: number
      status: string
    }[]
  }
}
