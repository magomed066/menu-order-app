import { Button, ScrollArea, ScrollBar } from '@/shared/ui'

const categoriesList = ['Pizza', 'Coffe', 'Drink', 'Hamburger']

function CategoriesListWidget() {
  return (
    <ScrollArea className="w-[70%] pb-4">
      <div className="flex items-center gap-3">
        {categoriesList.map((el) => (
          <Button key={el} variant="outline">
            {el}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export default CategoriesListWidget
