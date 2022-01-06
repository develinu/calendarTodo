import React from "react"
import CalendarDay from './CalendarDay'
import './Calendar.scss'
import { useSelector } from 'react-redux';
import { getCalendarData, getDayOfWeekName, getTargetDateFromDay } from "../utils/date";


const Calendar = () => {
  const { title, header, elements, disabled } = getCalendarData()
  const weekDaysCount = header.length
  const weekCount = Math.ceil(elements.length / weekDaysCount)
  const { todos } = useSelector(state => state)

  const getMatchDateTodoData = (day) => {
    return todos.find(_todo => _todo.date === getTargetDateFromDay(day))
  }

  

  return (
    <div className="calendar">
      <div className="title">
        <p> {title.year}.{title.month.toString().padStart(2, "0")} </p>
      </div>
      <div className="body">
        <div className="header">
          {
            // dow : Day of Week
            header.map((dow, idx) => {
              return <span key={idx} className={`dow ${getDayOfWeekName(idx)}`} >{dow}</span>
            })
          }
        </div>

        <div className="elements">
          {
            [...Array(weekCount)].map((e, idx) => {
              return (
                <div key={idx} className="week">
                  {
                    elements.slice(idx * weekDaysCount, (idx+1) * weekDaysCount).map((e, idx ) => {
                      return <CalendarDay 
                        key={`${idx}-${e}`}
                        day={e}
                        todoData={getMatchDateTodoData(e)}
                        dayOfWeek={getDayOfWeekName(idx)}
                        disabled={disabled.includes(e)} />
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Calendar;