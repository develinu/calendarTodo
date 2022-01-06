import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import './AddTodo.scss'
import { useSelector, useDispatch } from 'react-redux';
import { getTargetDateFromDay } from '../utils/date';


const AddTodo = () => {

  const { day, id } = useParams()
  const history = useHistory()
  const date = getTargetDateFromDay(day)
  const { targetTodo } = useSelector(state => state)
  const dispatch = useDispatch()

  let startTime = ''
  let endTime = ''
  let todoText = ''


  const validFormValues = () => {
    if (!startTime || startTime === '') {
      window.alert('시작 시간을 선택해주세요.')
      return false
    } else if (!endTime || endTime === '') {
      window.alert('종료 시간을 선택해주세요.')
      return false
    } else if (!todoText || todoText === '') {
      window.alert('할 일을 입력해주세요.')
      return false
    }

    return true
  }

  const addTodo = (e) => {
    e.preventDefault();
    if (!validFormValues()) {
      return
    }
    
    targetTodo.todo = [
      ...targetTodo.todo, 
      {
        id: id,
        period: [startTime, endTime],
        subject: todoText
      }
    ]

    dispatch({ type: 'add', payload: { date: date, todo: targetTodo } })

    history.push(`/todo/${day}`)
  }

  const timePickHandler = (e, name) => {
    if (name === 'start') {
      startTime = e.target.value
    } else if (name === 'end') {
      endTime = e.target.value
    }
  }

  const todoInputHandler = (e) => {
    todoText = e.target.value
  }

  return (
    <div className="add-todo-popup">
      <div className="add-todo">
        <div className="back">
          <button className="btn-back" onClick={ () => { history.goBack() } }>
            ＜
          </button>
        </div>
        <div className="title">
          할 일 추가
        </div>
        <form onSubmit={addTodo}>
          <div className="time-picker">
            <label>시작 시간 : </label>
            <input 
              type="time"
              name="start-time" 
              className="start-time" 
              onChange={(e) => { timePickHandler(e, "start") }}/>
          </div>

          <div className="time-picker">
            <label>종료 시간 : </label>
            <input 
              type="time"
              name="end-time" 
              className="end-time" 
              onChange={(e) => { timePickHandler(e, "end") }}/>
          </div>

          <div className="todo-textarea">
            <label className="todo-input-label">할 일 </label>
            <textarea 
              name="todo-input"
              onChange={ (e) => {todoInputHandler(e)} }
            ></textarea>
          </div>

          <div className="btn">
            <input type="submit" value="등록" className="btn-add" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTodo;