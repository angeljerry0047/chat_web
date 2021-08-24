import React, { useContext, useState, useEffect } from 'react';
import '../App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faTimes, faUserCircle, faLaughBeam, faPaperPlane, faAngleRight, faAngleLeft, faCalendarAlt, faVideo, faPhone, faTimesCircle, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import ScrollIntoView from 'react-scroll-into-view';
import ReactTooltip from 'react-tooltip';
import ChatContext from '../context/chatContext';
import video from '../assets/video.png';
import phone from '../assets/phone.png';
import send from '../assets/send.png';
import server from '../shared/server';
import { io, endpoint } from '../shared/socket';
library.add(faAngleRight, faCaretDown, faCaretUp, faTimes, faUserCircle, faLaughBeam, faPaperPlane, faAngleLeft, faCalendarAlt, faVideo, faPhone, faTimesCircle);

function EzChatChatScreen() {
  /**
   * Pulls all functions and data from dataFunctions array in
   * ChatContext. Use dataFunctions.functionName to reference
  */
  const dataFunctions = useContext(ChatContext);
  const [checkEmpty, setCheckEmpty] = useState('');
  const [phoneInput, setPhoneInput] = useState(false);
  const [vidChatBtn, setVidChatBtn] = useState(false);
  const [chatBtn, setChatBtn] = useState(false);
  const [nameCircle, setNameCircle] = useState(true);
  let  [,setState]=useState();

  useEffect(() => {
    dataFunctions.scrollItDown();
  }, []);

  function validateName(){      
    dataFunctions.sendMessage();
    setChatBtn(true);
  }

  function onSubmit(e) {
    e.preventDefault();
    setChatBtn(true);
  }

  function typeInProgress(e) {
    let v = e.target.value.trim();
    dataFunctions.sendTypeProgress(v);
  }

  function startVideoChat(){
    dataFunctions.callVideoApi();
    setVidChatBtn(true);
  }
  
  function endVideoChat(){
    dataFunctions.endVideoApi();
    setVidChatBtn(false);
    let shortId = JSON.parse(localStorage.getItem('__upscope:shortId'));
    server.get(`/dealer/video/stop?shortId=${shortId}`).then(res => {

    })
  }

  useEffect(() => {
    const s = io(endpoint);
    s.on('customer-video-end', () => {
      console.log("customer-video-end called");
      console.log(dataFunctions.videoChatData);
      dataFunctions.endVideoApi();
      setVidChatBtn(false); 
    })
  }, [dataFunctions.videoChatData])
  
  return (
    <>
      <div style={{background:'#ffffff'}}>
      
        {vidChatBtn ?  
          <div onClick={endVideoChat} className="ez-chat-end-chat">End Video</div>
          :
          null
        }
        <div className="ez-chat-bottom" id="ezChatBottom">
       
          {phoneInput ?
            <div style={{display:'flex',alignItems:'center'}}>
              <fieldset className="info-fieldsets" style={{ paddingLeft: '5px', paddingBottom: '5px', width:'100%' }}>
                <input type="text" className="ez-chat-name-field" placeholder="Phone" style={{ margin: "0px" }} required="required" value={dataFunctions.userPhone} onChange={(e) => { dataFunctions.setUserPhone(e.target.value); }} />
              </fieldset>
            </div>
          :
          null
          }
          <div className="ez-chat-input-container">
            <div style={{ position: 'relative', width: '95%', paddingRight:50 }}>
              <input type="text" className="ez-chat-chat-input" placeholder="Send Message" value={dataFunctions.userMessage} onKeyUp={typeInProgress} onChange={(e) => { dataFunctions.setUserMessage(e.target.value); }}/>
              {dataFunctions.noName ?
              <>
                <img src={send} className="ezMinimizeChat chatSend" alt="Video Call"  onClick={validateName} data-tip="Send Message"/>
                {/* <FontAwesomeIcon  icon="paper-plane" className="ezMinimizeChat chatSend" onClick={validateName} data-tip="Send Message" /> */}
                <ReactTooltip place="left" />
              </>
              :
              <>
                <img src={send} className="ezMinimizeChat chatSend" alt="Video Call"  onClick={validateName} data-tip="Send Message"/>
                {/* <FontAwesomeIcon icon="paper-plane" className="ezMinimizeChat chatSend"  data-tip="Please fill out name" style={{color:"#999"}} /> */}
                <ReactTooltip place="left" />
              </>
              }
            </div>
          </div>
        </div>
        {chatBtn ?
         <div style={{display:'flex',borderTop:'1px solid #bfbfbf' }}>
         <div style={{display:'flex', marginRight:7, alignContent:'center',borderRight:'1px solid #bfbfbf', flex:1, margin:'0px auto', padding:'4px 0'}}>
          <div style={{margin:'0 auto'}}>
            <a href="tel:4126087314,4129995886" style={{color:'#ffffff', fontWeight:'700', padding:2, fontSize:13, display: 'flex', alignItems: 'center'}} className="ezMinimizeChat" data-tip="Video Chat Enabled">
            {/* <FontAwesomeIcon icon="phone" className="ezMinimizeChat" style={{color:'#005AFF', marginRight:7,}} data-tip="Video Chat Enabled"/>  */}
            <img src={phone} style={{marginRight:5}}  className="ezMinimizeChat" alt="Video Call"/>
            <span style={{color:'#005AFF'}}>Call </span>
            </a>
            <ReactTooltip place="left" />
          </div>
        </div>
        <div style={{display:'flex', marginRight:7, alignContent:'center', flex:1, margin:' 0px auto', padding:'4px 0'}}>
          <div  style={{margin:'0 auto'}} onClick={startVideoChat}>
            <div style={{color:'#ffffff', fontWeight:'700', padding:2, fontSize:13, display: 'flex', alignItems: 'center'}} className="ezMinimizeChat" data-tip="Video Chat Enabled">
            {/* <FontAwesomeIcon icon="video" className="ezMinimizeChat" style={{color:'#005AFF', marginRight:7, WebkitTextStroke:'1px solid #000'}} data-tip="Video Chat Enabled"/>  */}
            <img src={video} style={{marginRight:5}} className="ezMinimizeChat" alt="Video Call"/>
            <span style={{color:'#005AFF'}}>Video Call</span>
            </div>
            <ReactTooltip place="left" />
          </div>
        </div>
      </div>
      
      :
      null
      }
      </div>
     
    </>
  );
}

export default EzChatChatScreen;