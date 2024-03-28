import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

function handleDateToDaate(givenisodate) {
  return `${givenisodate.getFullYear()}-${givenisodate.getMonth() + 1}-${givenisodate.getDate()}`
}

// eslint-disable-next-line react/prop-types
const CalendarCmp = ({ setSelectedDate, calendarDate, setHolidayReason }) => {
  const [value, onChange] = useState(new Date())
  useEffect(() => {
    setSelectedDate(value)
    if (calendarDate && calendarDate[handleDateToDaate(value)]) {
      // eslint-disable-next-line react/prop-types
      setHolidayReason(calendarDate[handleDateToDaate(value)].holidayReason)
    } else {
      setHolidayReason('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSelectedDate, value])
  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  )
}

export default CalendarCmp
