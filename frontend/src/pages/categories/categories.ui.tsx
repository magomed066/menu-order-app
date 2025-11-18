import CategoriesActionsFeature from '@/features/categories-actions'

import AdminCategoriesListWidget from '@/widgets/admin-categories-list'

function CategoriesPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <CategoriesActionsFeature />
      <AdminCategoriesListWidget />
    </div>
  )
}

export default CategoriesPage

