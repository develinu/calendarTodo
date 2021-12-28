import React from 'react';
import './App.scss';
import calendarData from './Data/calendar'
import todoData from './Data/data'
import { Route, useHistory, useParams } from 'react-router-dom'
import { useState } from 'react'

import Calendar from './Components/Calendar'
import TodoList from './Components/TodoList'
import AddTodo from './Components/AddTodo'


const App = () => {

  const [todo, setTodo] = useState([...todoData])

  const year = calendarData.title.year
  const month = calendarData.title.month.toString().padStart(2, "0")

  const getTargetDateFromDay = (day) => {
    return parseInt(`${year}${month}${day.toString().padStart(2, "0")}`)
  }

  return (
    <div className="app">
      <Route exact path="/">
        <Calendar
          calendarData={calendarData} 
          todo={todo} 
          getTargetDateFromDay={getTargetDateFromDay} /> 
      </Route>

      <Route exact path="/todo/:day">
        <TodoList
          year={calendarData.title.year}
          month={month}
          todo={todo} 
          setTodo={setTodo}
          getTargetDateFromDay={getTargetDateFromDay} />
      </Route>

      <Route exact path="/todo/:day/add/:id">
        <AddTodo
          todo={todo}
          setTodo={setTodo}
          getTargetDateFromDay={getTargetDateFromDay} />
      </Route>
    </div>
  );
}

export default App;
