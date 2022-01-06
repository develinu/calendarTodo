import React, { useState, useEffect } from "react"
import { useParams, useHistory } from 'react-router-dom'
import './TodoList.scss'
import { getTargetDateFromDay, getCalendarYear, getCalendarMonth, getCalendarDay } from "../utils/date"
import { useSelector, useDispatch } from 'react-redux';


const TodoList = () => {

  const { day } = useParams()
  const history = useHistory()
  const date = getTargetDateFromDay(day)
  const strYear = getCalendarYear()
  const strMonth = getCalendarMonth()
  const strDay = getCalendarDay(day)
  const { targetTodo } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'on', payload: { name: 'TodoList' } })
  }, [day])
    

  const onClickAddTodoHandler = () => {    
    let lastId = targetTodo?.todo[targetTodo.todo.length - 1]?.id
    let nextId = lastId
      ? `${lastId.slice(0, lastId.length - 1)}${convertNextChar(lastId[lastId.length - 1])}`
      : `${date.toString()}a`
    dispatch({ type: 'off', payload: { name: "AddTodo" } })
    history.push(`/todo/${day}/add/${nextId}`)
  }

  const convertNextChar = (char) => {
    let asciiChar = char.charCodeAt(0)
    return String.fromCharCode(asciiChar + 1)
  }

  return (
    <div className="todo-list-popup">
      <div className="todo-list">
        <div className="back">
          <button className="btn-back" onClick={ () => { history.push("/") } }>
            ＜
          </button>
        </div>
        <div className="title">
          {strYear}. {strMonth}. {strDay}
        </div>

        <div className="items">
        {
          targetTodo.todo
          ? targetTodo.todo.map((e, idx) => {
            return <Todo key={e.id} item={e} />
          })
          : null
        }
        </div>
        <div className="btn">        
          <button className="btn-add" onClick={onClickAddTodoHandler}>추가</button>
        </div>
      </div>
    </div>
  )
}

const Todo = ({ item }) => {
  const { id, period, subject } = item
  const { day } = useParams()
  const date = getTargetDateFromDay(day)
  const { targetTodo } = useSelector(state => state)
  const dispatch = useDispatch()
  const checked = targetTodo?.todo?.find(e => e.id === id)?.checked

  const deleteTodo = () => {
    targetTodo.todo = targetTodo.todo.filter(_todo => _todo.id !== id)
    dispatch({ type: 'delete', payload: { date: date, todo: targetTodo }})
  }

  const checkTodo = (e) => {
    dispatch({ type: 'check', payload: { date: date, id: id, checked: e.target.checked }})
  }
  
  return (
    <div key={item.id} className="item">
      <div className="check">
        <input type="checkbox" checked={checked} onChange={checkTodo}/>
      </div>
      <div className={`content ${checked ? "checked" : ""}`}>
        <p>시간 : {period[0]} - {period[1]}</p>
        <p>내용 : {subject}</p>
      </div> 
      <div className="btn">                
        <button className="btn-delete" onClick={() => {deleteTodo(id)}} >삭제</button>
      </div>             
    </div>
  )
}

export default TodoList;