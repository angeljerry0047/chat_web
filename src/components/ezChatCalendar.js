import React, { useContext, useEffect } from 'react';
import '../App.css';
import 'moment-timezone';
import ChatContext from '../context/chatContext';


function EzChatCalendar() {
  /**
   * Pulls all functions and data from dataFunctions array in
   * ChatContext. Use dataFunctions.functionName to reference
   */
  const dataFunctions = useContext(ChatContext);

  useEffect(() => {
    async function setCurrentDay() {
      //window.setTimeout(()=>{
      manualDayChange();
      //}, 5);
    }
    setCurrentDay();

  }, []);

  function manualDayChange() {
    dataFunctions.onChangeCalendar(dataFunctions.calendarDayData[0], 0, dataFunctions.calendarDayData[3]);
  }

  return (
    <>
      <div className="ez-chat-scheduler-box">
        {dataFunctions.closeTheCalendar ?
          <ul className="ez-chat-calendar-day-list">
            {dataFunctions.calendarDayData.map((d, i) =>
              <li key={d[0]} className="ez-chat-custom-calendar">
                <div className="ez-chat-day-slot" onClick={() => { dataFunctions.onChangeCalendar(d[0], i, d[3]) }}>
                  <div className="ez-chat-current-day">{d[0]}</div>
                  <div className="ez-chat-current-month-day">{d[2]}&nbsp;{d[1]}</div>
                </div>
              </li>
            )}
          </ul>
          :
          null
        }
        {dataFunctions.timeBoxVisible ?
          <div>
            <div className="ez-chat-schedule-box">
              {dataFunctions.buildDayStuff()}
            </div>
          </div>
          :
          null
        }
      </div>
    </>
  );
}
export default EzChatCalendar;

