import { ru } from 'date-fns/locale'
import { ClipboardClock } from 'lucide-react'
import { Link } from 'react-router-dom'

import ThemeToggleFeature from '@/features/theme-toggle'
import TimeSlotFeature from '@/features/time-slot'

import { routes } from '@/shared/lib/config'

import {
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui'

function MainPage() {
  return (
    // <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 relative">
    {
      /* <div className="flex w-full max-w-3xl flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <ClipboardClock className="size-4" />
          </div>
          Book an appointment
        </a>

        <Link to={routes.dashboard}>
          <Button variant="link">Dashboard</Button>
        </Link>

        <Card className="h-screen md:h-[430px]">
          <CardHeader>
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
          </CardContent>
        </Card>
      </div>

      <div className="absolute top-4 right-4">
        <ThemeToggleFeature />
      </div> */
    }
    // </div>
  )
}

export default MainPage
