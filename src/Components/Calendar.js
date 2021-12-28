import React from "react"
import CalendarDay from './CalendarDay'
import './Calendar.scss'


const Calendar = (props) => {
  const { getTargetDateFromDay } = props
  const { title, header, elements, disabled } = props.calendarData
  const weekDaysCount = header.length
  const weekCount = Math.ceil(elements.length / weekDaysCount)

  const getDayOfWeekName = (idx) => {
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

  const getMatchDateTodo = (day) => {
    let date = getTargetDateFromDay(day)
    let filteredTodoData = props.todo.filter(_todo => _todo.date === date)
    filteredTodoData = filteredTodoData.map(e => e.todo)
    if (filteredTodoData) {
      return filteredTodoData[0]
    }
    return []
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
                        dayOfWeek={getDayOfWeekName(idx)}
                        todo={getMatchDateTodo(e)}
                        setTargetTodo={props.setTargetTodo}
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