import OrderCardWidget from '@/widgets/order-card'
import OrdersListWidget from '@/widgets/orders-list'

function OrdersPage() {
  return (
    <div className="w-full items-stretch">
      <div className="flex flex-wrap gap-5">
        <OrdersListWidget />
        <OrderCardWidget />
      </div>
    </div>
  )
}

export default OrdersPage
