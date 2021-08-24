import React, { useContext, useEffect, useRef } from 'react';
import '../App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faTimes, faUserCircle, faLaughBeam, faPaperPlane, faAngleRight, faAngleLeft, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import ReactTooltip from 'react-tooltip';
import ChatContext from '../context/chatContext';

library.add(faAngleRight, faCaretDown, faCaretUp, faTimes, faUserCircle, faLaughBeam, faPaperPlane, faAngleLeft, faCalendarAlt);


function EzChatTextField() {
  /**
   * Pulls all functions and data from dataFunctions array in
   * ChatContext. Use dataFunctions.functionName to reference
  */
  const dataFunctions = useContext(ChatContext);
  const [noName, setNoName] = useState(false);
  const ref = useRef(dataFunctions.noName);
  
  useEffect(()=>{

  async function validateName(){
    //const val = document.getElementById(ezChatNameInputField).getAttribute("value");
    if(ref === false){
      setNoName(true);
    }else{
    }
  }
  validateName();
  },[])
  function typeInProgress(e) {
    let v = e.target.value.trim();
    dataFunctions.sendTypeProgress(v);
  }
  
  return (
    <>
                   
      <div>
        <div className="ez-chat-bottom" id="ezChatBottom">
          {/* {(!dataFunctions.ezStartChat) ?
            <> */}
            {dataFunctions.nameField ?
            <form
              className="form-inside-input"
              //onSubmit={onSubmit}
              
            >
              <fieldset className="info-fieldsets" style={{ paddingLeft: '5px', paddingBottom: '5px' }}>
                <input id="ezChatNameInputField" type="text" className="ez-chat-name-field" placeholder="Name" style={{ margin: "0px" }} required value={dataFunctions.userName} onChange={(e) => { dataFunctions.setUserName(e.target.value); }} />
              </fieldset>
             
            </form>
            :
            <div><p className="user-name-tag">Welcome&nbsp;{dataFunctions.userName}</p></div>
            }
            {/* </>
            :
            null  }*/}
                
          <div className="ez-chat-input-container">
            <div style={{ position: 'relative', marginBottom: ' -3px' }}>
              <textarea wrap="hard" type="text" className="ez-chat-chat-input" placeholder="Message" cols="50" rows={3} value={dataFunctions.userMessage} onKeyUp={typeInProgress} onChange={(e) => { dataFunctions.setUserMessage(e.target.value); }}></textarea>
              {noName ?
              <>
              <FontAwesomeIcon  icon="paper-plane" color="#999" className="ezMinimizeChat chatSend" onClick={dataFunctions.sendMessage} data-tip="Send Message" />
              <ReactTooltip place="left" />
              </>
              :
              <>
              <FontAwesomeIcon icon="paper-plane" className="ezMinimizeChat chatSend"  data-tip="Please fill out name" />
              <ReactTooltip place="Bottom" />
              </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EzChatTextField;