import React from 'react';
import './App.scss';
import calendarData from './Data/calendar'
import todoData from './Data/data'
import { Route } from 'react-router-dom'
import { useState } from 'react'


const App = () => {
  return (
    <div className="app">
      <Route exact path="/">
        <Calendar calendarData={calendarData} todoData={todoData}/>
      </Route>

      <Route path="/popup">
        POPUP TEST
      </Route>
    </div>
  );
}

const Calendar = (props) => {
  const { title, header, elements, disabled } = props.calendarData
  const weekDaysCount = header.length
  const weekCount = Math.ceil(elements.length / weekDaysCount)

  const [todoData, setTodoData] = useState(props.todoData)

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
    let filteredTodoData = todoData.filter(e => getDayFromIntDate(e.date) === convertIntDayToStringDay(day))    
    filteredTodoData = filteredTodoData.map(e => e.todo)
    if (filteredTodoData) {
      return filteredTodoData[0]
    }
    return []
  }

  const getDayFromIntDate = (date) => {
    return date.toString().slice(-2)
  }

  const convertIntDayToStringDay = (day) => {
    return day.toString().padStart(2, "0")
  }

  const onClickDayHandler = (day, disabled) => {
    if (disabled) {
      return
    }

    console.log(`clicked ${day}`)

    window.open("/popup", "test", "width=500, height=500, top=500, left=1000")
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
                <div key={e} className="week">
                  {
                    elements.slice(idx * weekDaysCount, (idx+1) * weekDaysCount).map((e, idx ) => {
                      return <CalendarDay 
                        day={e} 
                        dayOfWeek={getDayOfWeekName(idx)}
                        todo={getMatchDateTodo(e)}
                        disabled={disabled.includes(e)}
                        onClickDayHandler={onClickDayHandler} />
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

const CalendarDay = (props) => {
  const { day, dayOfWeek, todo, disabled, onClickDayHandler } = props

  return (
    <span className={`element ${dayOfWeek} ${disabled ? "disabled" : ""}`} onClick={() => onClickDayHandler(day, disabled)}>
      <p>{day}</p>
      {
        todo
        ? todo.map(e => {
          console.log(e)
          return <p className="todo">{e.subject}</p>
        })
        : null        
      }
    </span>
  )
}

export default App;
