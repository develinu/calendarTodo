import React from "react"
import { useHistory } from 'react-router-dom'


const CalendarDay = (props) => {
  const { day, dayOfWeek, todo, disabled } = props
  const history = useHistory()

  const onClickDayHandler = () => {
    if (disabled) {
      return
    }
    history.push(`/todo/${day}`)
  }

  return (
    <span className={`element ${dayOfWeek} ${disabled ? "disabled" : ""}`} onClick={onClickDayHandler}>
      <p>{day}</p>
      {
        todo
        ? todo.map(e => {
          // console.log(e)
          return <p key={e.id} className="todo">{e.subject}</p>
        })
        : null        
      }
    </span>
  )
}

export default CalendarDay;