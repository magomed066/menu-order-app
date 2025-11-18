import { useCart } from '@/entities/cart'

import { useAppTranslation } from '@/shared/lib/hooks'
import { notify } from '@/shared/lib/toast'

import { Button } from '@/shared/ui'

import type { Props } from './types'

function AddToCartFeature(props: Props) {
  const { data, inCart } = props

  const { t } = useAppTranslation()
  const { add } = useCart()

  const handleClick = () => {
    if (inCart) {
      notify('warning', 'Продукт уже в корзине')
      return
    }
    add(data)
  }

  return (
    <Button onClick={handleClick} variant="default">
      {inCart ? 'Уже в корзине' : t('pages:addToCart')}
    </Button>
  )
}

export default AddToCartFeature
