import React from 'react';
import './App.scss';
import { Route } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { useSelector } from 'react-redux';

import Calendar from './Components/Calendar'
import TodoList from './Components/TodoList'
import AddTodo from './Components/AddTodo'


const App = () => {

  const { popupTransitionFlag } = useSelector(state => state)
  
  const getPopupTransitionFlag = (name) => {
    let _findPopupFlag = popupTransitionFlag.find(e => e.name === name)
    return _findPopupFlag.flag
  }

  return (
    <div className="app">
      <Route path="/">
        <Calendar /> 
      </Route>

      <Route path="/todo/:day">
        <CSSTransition in={getPopupTransitionFlag("TodoList")} classNames="popup" timeout={500}>
          <TodoList />
        </CSSTransition>
      </Route>

      <Route path="/todo/:day/add/:id">
        <CSSTransition in={getPopupTransitionFlag("AddTodo")} classNames="popup" timeout={500}>
          <AddTodo />
        </CSSTransition>
      </Route>
    </div>
  );
}

export default App;
