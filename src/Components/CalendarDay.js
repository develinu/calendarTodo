import React from "react"
import './CalendarDay.scss'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"


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

  const isCompleted = (targetId) => {
    let _isCompleted = todoData?.todo?.find(e => e.id === targetId)?.checked
    return _isCompleted ? "completed" : ""
  }

  return (
    <span className={`element ${dayOfWeek} ${disabled ? "disabled" : ""}`} onClick={onClickDayHandler}>
      <p>{day}</p>
      {
        todoData?.todo
        ? todoData.todo.map(e => {
          return <p key={e.id} className={`todo ${isCompleted(e.id)}`}>{e.subject}</p>
        })
        : null        
      }
    </span>
  )
}

export default CalendarDay;