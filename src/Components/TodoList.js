import React from "react"
import { useParams, useHistory } from 'react-router-dom'
import './TodoList.scss'


const TodoList = (props) => {
  const { year, month, getTargetDateFromDay} = props  
  const { day } = useParams()
  const history = useHistory()
  const date = getTargetDateFromDay(day)
  const targetTodo = props.todo.find(_todo => _todo.date === date)
  
  const deleteTodo = (targetId) => {
    targetTodo.todo = targetTodo.todo.filter(_todo => _todo.id !== targetId)
    props.setTodo([...props.todo.filter(_todo => _todo.date !== date), targetTodo])
  }

  const onClickAddTodoHandler = () => {    
    let lastId = targetTodo?.todo[targetTodo.todo.length - 1]?.id
    let nextId = lastId
      ? `${lastId.slice(0, lastId.length - 1)}${convertNextChar(lastId[lastId.length - 1])}`
      : `${date.toString()}a`
    history.push(`/todo/${day}/add/${nextId}`)
  }

  const convertNextChar = (char) => {
    let asciiChar = char.charCodeAt(0)
    return String.fromCharCode(asciiChar + 1)
  }

  return (
    <div className="todo-list">
      <div className="back">
        <button className="btn-back" onClick={ () => { history.push("/") } }>
          ＜
        </button>
      </div>
      <div className="title">
        {year}. {month}. {day.toString().padStart(2, "0")}
      </div>

      <div className="items">
      {
        targetTodo.todo
        ? targetTodo.todo.map((e, idx) => {
          return (
            <div key={e.id} className="item">
              <div className="content">
                <p>시간 : {e.period[0]} - {e.period[1]}</p>
                <p>내용 : {e.subject}</p>
              </div> 
              <div className="btn">                
                <button className="btn-delete" onClick={() => {deleteTodo(e.id)}} >삭제</button>
              </div>             
            </div>
          )
        })
        : null
      }
      </div>
      <div className="btn">        
        <button className="btn-add" onClick={onClickAddTodoHandler}>추가</button>
      </div>
    </div>
  )
}

export default TodoList;