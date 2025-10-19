"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function DateTimePicker({
    value,
    onChange,
}: {
    value: Date | null
    onChange: (value: Date | null) => void
    }) {
    const [date, setDate] = React.useState<Date | null>(value)
    const [time, setTime] = React.useState("")

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (!selectedDate) return
        const newDate = new Date(selectedDate)
        if (time) {
        const [hours, minutes] = time.split(":").map(Number)
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        }
        setDate(newDate)
        onChange(newDate)
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value
        setTime(newTime)
        if (date) {
        const newDate = new Date(date)
        const [hours, minutes] = newTime.split(":").map(Number)
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        onChange(newDate)
        }
    }

    return (
        <div className="flex items-center gap-2">
        <Popover>
            <PopoverTrigger asChild>
            <Button
                variant="outline"
                className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
                )}
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP p") : <span>Pick a date</span>}
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                mode="single"
                selected={date ?? undefined}
                onSelect={handleDateSelect}
                initialFocus
            />
            <div className="p-3 border-t">
                <Input
                type="time"
                value={time}
                onChange={handleTimeChange}
                className="w-full"
                />
            </div>
            </PopoverContent>
        </Popover>
        </div>
    )
}
