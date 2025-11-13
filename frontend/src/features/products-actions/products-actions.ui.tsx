import { Plus } from 'lucide-react'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from '@/shared/ui'

import ProductFormFeature from '../product-form'

function ProductsActionsFeature() {
  return (
    <div className="flex w-full items-center gap-3">
      <Input placeholder="Поиск по меню" className="max-w-[420px]" />
      <div className="flex-1" />

      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus /> Добавить продукт
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавить продукт</DialogTitle>
          </DialogHeader>

          <ProductFormFeature />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Отменить</Button>
            </DialogClose>
            <Button type="submit">Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductsActionsFeature
