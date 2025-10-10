import { Skeleton } from '@/shared/ui'

function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="h-[200px] w-full rounded-xl" />
        <Skeleton className="h-full w-full rounded-xl" />
        <Skeleton className="h-full w-full rounded-xl" />
      </div>

      <div className="bg-muted/60 min-h-[90vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  )
}

export default DashboardPage
