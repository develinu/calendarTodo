import React from 'react';
import './App.scss';
import calendarData from './Data/calendar'

const App = () => {
  return (
    <div className="app">
      <Calendar calendarData={calendarData} />
    </div>
  );
}

const Calendar = (props) => {
  const { title, header, elements, disabled } = props.calendarData
  const weekDaysCount = header.length
  const weekCount = Math.ceil(elements.length / weekDaysCount)

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

  const onClickDayHandler = (day, disabled) => {
    if (disabled) {
      return
    }
    
    console.log(`clicked ${day}`)
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
  const { day, dayOfWeek, disabled, onClickDayHandler } = props

  return (
    <span className={`element ${dayOfWeek} ${disabled ? "disabled" : ""}`} onClick={() => onClickDayHandler(day, disabled)}>
      <p>{day}</p>
    </span>
  )
}

export default App;
