import { Card, PageCenterWrapper } from '@/shared/ui'

function DashboardPage() {
  return (
    <PageCenterWrapper>
      <div className="max-w-[1200px] w-full">
        <Card className="w-full px-5 min-h-[500px] h-full">
          <h1>hello</h1>

          {/* <CardHeader>
            <CardTitle className="text-xl">Welcome back!</CardTitle>
            <CardDescription>Please select & book</CardDescription>
          </CardHeader>

          <CardContent className="flex justify-between flex-wrap">
            <Calendar
              className="rounded-md border shadow-sm"
              mode="single"
              captionLayout="dropdown"
              locale={ru}
            />

            <TimeSlotFeature />
          </CardContent> */}
        </Card>
      </div>
    </PageCenterWrapper>
  )
}

export default DashboardPage
