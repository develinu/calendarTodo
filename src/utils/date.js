import calendarData from '../data/calendar'

export const getCalendarData = () => {
  return calendarData
}

export const getCalendarYear = () => {
  return calendarData.title.year
}

export const getCalendarMonth = () => {
  return calendarData.title.month.toString().padStart(2, "0")
}

export const getCalendarDay = (day) => {
  return day.toString().padStart(2, "0")
}

export const getDayOfWeekName = (idx) => {
  const dowEnum = {
    0: "sun",
    1: "mon",
    2: "tue",
    3: "wed",
    4: "thu",
    5: "fri",
    6: "sat"
  }
  return dowEnum[idx]
}

export const getTargetDateFromDay = (day) => {
  return parseInt(
    `${getCalendarYear()}${getCalendarMonth()}${getCalendarDay(day)}`
  )
}