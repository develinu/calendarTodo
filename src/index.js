import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import todoData from './data/data'

/*
1. reducer if 구문 switch로 작성해보기
2. reducer state를 2개 이상 만들고 combinereducers로 관리 (그 외 훅으로 응용해보기!)
3. 리액트 애니메이션으로 팝업 효과 만들어보기
4. 팝업의 각각의 할 일 마다 체크박스 만들고 체크시 완료한 상태로 보여지도록 추가 기능 개발하기(이미지 참고)
*/

const todos = (state=[...todoData], action) => {
  let _state = [...state]

  switch (action.type) {
    case 'add':
      _state = [..._state, action.payload.todo]
      break

    case 'delete':
      _state = [..._state.filter(e => e.date !== action.payload.date), action.payload.todo]
      break
      
    default:
      break
  }
  return _state
}

const targetTodo = (state={}, action) => {
  switch (action.type) {
    case 'setTodo':
      state = action.payload
      break
      
    default:
      break
  }
  return state
}

const popupStates = [
  {
    name: 'TodoList',
    flag: false
  },
  {
    name: 'AddTodo',
    flag: false
  }
]

const popupTransitionFlag = (state=popupStates, action) => {
  let _state = [...state]
  let _findState

  switch (action.type) {
    case 'on':
      _findState = _state.find(e => e.name === action.payload.name)
      _findState.flag = true
      console.log(_state)
      break

    case 'off':
      _findState = _state.find(e => e.name === action.payload.name)
      _findState.flag = false
      break
      
    default:
      break
  }
  return _state
}

const store = createStore(combineReducers({ todos, targetTodo, popupTransitionFlag }))


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
