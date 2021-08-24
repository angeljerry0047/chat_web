import React, { useContext, useRef, useEffect } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown, faCaretUp, faTimes, faUserCircle, faLaughBeam, faPaperPlane, faAngleRight, faAngleLeft, faCalendarAlt, faCar } from '@fortawesome/free-solid-svg-icons';
import 'moment-timezone';
import smartlookClient from 'smartlook-client'
//Context
import { ChatProvider } from './context/chatContext';
import ChatContext from './context/chatContext';

//JSX Components

import EzChatCalendar from './components/ezChatCalendar';
import EzChatInventoryBox from './components/ezChatInventoryBox';
import EzChatHeader from './components/ezChatHeader';
import EzChatChatScreen from './components/ezChatChatScreen';
import EzChatSelectedVehicles from './components/ezChatSelectedVehicles';
import EzChatOpeningScreen from './components/ezChatOpeningScreen';
import EzChatSideButtons from './components/ezChatSideButtons';
import EzChatFinalMessage from './components/ezChatFinalMessage';
import EzChatMessageUnavailable from './components/ezChatMessageUnavailable';
import EzFaceChatDialog from './components/ezFaceChatDialog';
library.add(faAngleRight, faCar, faCaretDown, faCaretUp, faTimes, faUserCircle, faLaughBeam, faPaperPlane, faAngleLeft, faCalendarAlt);

function App() {
  /**
   * Pulls all functions and data from dataFunctions array in
   * ChatContext. Use dataFunctions.functionName to reference
   */
  const dataFunctions = useContext(ChatContext);
  // const chatBottomRef = useRef(null);
  // console.log(chatBottomRef.current);

  // const scrollItDown = () => {
  //   chatBottomRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  //   console.log('Clicked');
  // }

  useEffect(()=>{
    //change Api Key
    smartlookClient.init('7f47e629d002373cc02db755f1325a19c440dcf4');
    smartlookClient.identify(12345, {
      name: 'xyz',
      email: 'email@domain.com',
      // other custom properties
    })
    smartlookClient.getData(()=> {
      let w = window;
      console.log(w.smartlook.playUrl);
    });
  },[])
  return (
    <>
      <div onClick={() => { dataFunctions.interacted() }}>

        {/* {dataFunctions.dealerData.map(p =>
          <div key={dataFunctions.dealerData[0]}
            className="App"
            style={{ backgroundImage: `url(${require(`./${p.dealerBackgroundImage}.png`)})` }}>
          </div>
        )} */}
      <EzFaceChatDialog />
      <div className="ez-chat-image-box">
          {/* <EzChatSideButtons /> */}
          {dataFunctions.ezChatBox ?
            <div className="ez-chat-box">
              <EzChatInventoryBox />
              <EzChatHeader />
              <EzChatSelectedVehicles />
              {dataFunctions.showCalendar ?
                <EzChatCalendar />
                :
                null
              }
              {dataFunctions.dingHappened ?
                <div className="ez-chat-no-flex-container">
                  <div className="ez-chat-no-flex" id="out">
                    <EzChatOpeningScreen />
                    {dataFunctions.ezChatMainScreen ?
                      <div>

                        <div className="ez-chat-chat-container">
                          <div style={{width:'100%', maxHeight: 310, overflowY: 'scroll'}}>
                            {/* <div className="ez-chat-sales-entry-message">
                                Now connected
                            </div> */}
                            {
                              dataFunctions.messages.map((v, i) => {
                                return (
                                  <dataFunctions.Message key={`k${i}`} data={v} />
                                );
                              })
                            }
                             {dataFunctions.messagingAvailable ?
                              null
                              :
                              <div className="ez-chat-sales-message-container">
                                <div className="ez-chat-sales-line">
                                  <div className="ez-chat-sales-message">
                                    Sorry, the dealership is curently busy. If you would like a response to your message, please type your conatact information below and send.
                                  </div>
                                </div>
                              </div>
                              }
                            {dataFunctions.thankYouMessage ?
                            <div className="ez-chat-sales-message-container">
                                <div className="ez-chat-sales-line">
                                  <div className="ez-chat-sales-message">
                                    Thank you!
                                  </div>
                                </div>
                              </div>
                              :
                              null
                            }
                            {dataFunctions.userIsTyping ?
                              <div className="ez-chat-dots-container">
                                <div className="ez-chat-dots-dot-block">
                                  <div className="ez-chat-dot"></div>
                                  <div className="ez-chat-dot"></div>
                                  <div className="ez-chat-dot"></div>
                                </div>
                              </div>
                              :
                              null
                            }
                          <div ref={dataFunctions.chatBottomRef}></div>
                          </div>

                          {dataFunctions.showTextField ?
                            (<EzChatChatScreen />)
                            :
                            null
                          }{/*END showTextField*/}
                        </div>

                      </div>
                      :
                      null
                    }{/*END ezChatMainScreen*/}
                    <EzChatFinalMessage />

                  </div>
                </div>
                :
                null
              }{/*END dingHappened*/}
            </div>
            :
            null
          }{/*END ezChatBox*/}
          <img onClick={dataFunctions.openChatBox} className="ez-chat-image" alt="Speech bubble button to open up AutoEz EzChat Service" src={require('./ezChatImage.png')} />
        </div>{/*END ez-chat-image-box*/}
      </div>
    </>
  );/*END RETURN */
}/*END APP*/

export default () => {
  return <ChatProvider>
    <App />
  </ChatProvider>
};
