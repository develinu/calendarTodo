import React from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux"


const CalendarDay = (props) => {
  const { day, dayOfWeek, todoData, disabled } = props
  const history = useHistory()
  const dispatch = useDispatch()

  const onClickDayHandler = () => {
    if (disabled) {
      return
    }
    dispatch({ type: 'off', payload: { name: "TodoList" } })
    dispatch({ type: 'setTodo', payload: todoData })
    history.push(`/todo/${day}`)
  }

  return (
    <span className={`element ${dayOfWeek} ${disabled ? "disabled" : ""}`} onClick={onClickDayHandler}>
      <p>{day}</p>
      {
        todoData?.todo
        ? todoData.todo.map(e => {
          return <p key={e.id} className="todo">{e.subject}</p>
        })
        : null        
      }
    </span>
  )
}

export default CalendarDay;