import { useState } from 'react'

import { cn } from '@/shared/lib/utils'

import { Button, ScrollArea } from '@/shared/ui'

function TimeSlotFeature() {
  const [selected, setSelected] = useState<string | null>(null)

  const times = ['5:30 PM', '6:30 PM', '7:30 PM', '8:30 PM', '9:30 PM']

  return (
    <div className="w-full max-w-sm mx-auto ">
      <ScrollArea className="h-[300px] gap-3 pr-3">
        <div className="space-y-3">
          {times.map((time) => (
            <div key={time} className="flex gap-2">
              <Button
                variant="outline"
                className={cn('flex-1 py-6 rounded-xl text-md')}
                onClick={() => setSelected(time)}
              >
                {time}
              </Button>

              {selected === time && (
                <Button className="flex-1 py-6 rounded-xl text-md">
                  Select
                </Button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default TimeSlotFeature
