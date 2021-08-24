import React, { useState, useEffect, useRef } from 'react';
import 'moment-timezone';
import ReactTooltip from 'react-tooltip'
import { io, endpoint } from '../shared/socket';
import server from '../shared/server';
import moment from 'moment';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faTimes, faUserCircle, faLaughBeam, faPaperPlane, faAngleRight, faAngleLeft, faCalendarAlt, faCar, faComment, faWrench, faCarCrash, faGasPump, faChargingStation, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import WebSessionCounter from 'web-session-counter';
import ReactGA from 'react-ga';


library.add(faAngleRight, faCaretDown, faCaretUp, faTimes, faUserCircle, faLaughBeam, faPaperPlane, faAngleLeft, faCalendarAlt, faCar, faComment, faWrench, faCarCrash, faGasPump, faChargingStation, faArrowLeft);

const ChatContext = React.createContext();
const OT = require('@opentok/client');

export function ChatProvider({ children }) {

  const [dow, setDow] = useState(0);
  const [timeBoxVisible, setTimeBoxVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectCarData, setSelectCarData] = useState([]);
  const [selectCarDataVdp, setSelectCarDataVdp] = useState([]);
  const [carData, setCarData] = useState([]);
  const [filteredCarData, setFilteredCarData] = useState([]);
  const [filteredMakes, setFilteredMakes] = useState([]);
  const [filteredPrice, setFilteredPrice] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [dealerData, setDealerData] = useState([]);
  const [dealerInfoData, setDealerInfoData] = useState([]);
  const [storeHours, setStoreHours] = useState([]);
  const [searchTyped, setSearchTyped] = useState(false);
  const [searchModelText, setSearchModelText] = useState('');
  const [modelSearchList, setModelSearchList] = useState([]);
  const [dingHappened, setDingHappened] = useState(true);
  const [searchModelVisible, showSearchModelVisible] = useState(true);
  const [ezChatBox, setEzChatBox] = useState(true);
  const [inventoryBox, setInventoryBox] = useState(false);
  const [additionalFeatBox, setAdditionalFeatBox] = useState(true);
  const [carIsSelected, setCarIsSelected] = useState(false);
  const [hideCalendar, setHideCalendar] = useState(false);
  const [sectionTwo, showSectionTwo] = useState(false);
  const [ezStartChat, showEzStartChat] = useState(true);
  const [ezChatMainScreen, showEzChatMainScreen] = useState(true);
  const [showTextField, setShowTextField] = useState(true);
  const [inventoryList, setInventoryList] = useState(true);
  const [closeTheCalendar, setCloseTheCalendar] = useState(true);
  const [editYourInfo, showEditYourInfo] = useState(false);
  const [finalMessage, showFinalMessage] = useState(false);
  const [purchaseInfo, setPurchaseInfo] = useState();
  const [calendarDayData, setCalendarDayData] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [socket, setSocket] = useState(null);
  const [userMessage, setUserMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const [userIsTyping, setUserIsTyping] = useState(false);
  const [cid, setCid] = useState(null);
  const [uid, setUid] = useState(null);
  const [makeValue, setMakeValue] = React.useState('all');
  const [modelValue, setModelValue] = React.useState('all');
  const [priceValue, setPriceValue] = React.useState('Low');
  const [openingScreenBtn, setOpeningScreenBtn] = React.useState(true);
  const [statusVal, setStatusVal] = React.useState(true);
  const [sideButtons, setSideButtons] = React.useState(false);
  const [defaultCheckedVal, setDefaultCheckedVal] = React.useState(false);
  const [defaultCheckedCal, setDefaultCheckedCal] = React.useState(false);
  const [defaultCheckedSelect, setDefaultCheckedSelect] = React.useState(false);
  const [vdpBox, setVdpBox] = useState(false);
  const [autoOrManual, setAutoOrManual] = useState(true);
  const [gasOrElectric, setGasOrElectric] = useState(true);
  const [vehicleTogggleOne, setVehicleTogggleOne] = useState(false);
  const [vehicleTogggleTwo, setVehicleTogggleTwo] = useState(false);
  const [vehicleTogggleThree, setVehicleTogggleThree] = useState(false);
  const [backBtnArrow, setBackBtnArrow] = useState(false);
  //const [notAcceptingScreen, setNotAcceptingScreen] = useState(false);
  const [startedConversation, setStartedConversation] = useState(false);
  const [schedDate, setSchedDate] = useState(null);
  const [schedTime, setSchedTime] = useState(null);
  const [typeOfUser, setTypeOfUser] = useState(true);
  const [scheduledVisit, setScheduledVisit] = useState( true );
  const [serviceBtn, setServiceBtn] = useState( false );
  const [bodyShopBtn, setBodyShopBtn] = useState( false );
  const [dealerDataTwo, setDealerDataTwo] = useState([]);
  const [videoData, setVideoData] = useState({});
  const [messagingAvailable, setMessagingAvailable] = useState( true );
  const currentDomain =  [window.location.hostname];
  const [domain, setDomain] = useState(currentDomain);
  const [userPhone, setUserPhone] = useState('');
  const [videoApi, setVideoApi] = useState();
  const [videoToken, setVideoToken] = useState();
  const [videoSessionId, setVideoSessionId] = useState();
  const chatBottomRef = useRef(null);
  const [videoChatData, setVideoChatData] = useState({});
  const [nameField, setNameField] = useState(true);
  const [newOptions, setNewOptions] = useState([]);
  const [usedOptions, setUsedOptions] = useState([]);
  const [chatStarted, setChatStarted] = useState(true);
  const [noMessage, setNoMessage] = useState(false);
  const [noMessageTimer, setNoMessageTimer] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [notValid, setNotValid] = useState(true);
  const [thankYouMessage, setThankYouMessage] = useState(false);
  const [noName, setNoName] = useState(true);
  let  [,setState]=useState();

  const [shortId, setShortID] = useState('');

  const [activeDealers, setActiveDealers] = useState([]);

  const [session1, setSession1] = useState({});

  const saveSession = (session) => {
    setSession1(session);
  }

  let timerNone = undefined;
  const scrollItDown = () => {
    chatBottomRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
  //Google Analytics
  const trackingId = "UA-171145311-1";
  ReactGA.initialize(trackingId);
 
  
  //Get the active dealers for the domain
  useEffect(() => {
    server.post('/web/conv/get-active-users',{domain: 'rotolosdodgechryslerjeep.com'}).then(res => {
      setActiveDealers(res.data.activeUsers);
    }).catch(err => {
      console.error(err);
    })
    if(localStorage.getItem('__upscope:shortId')){
      setShortID(JSON.parse(localStorage.getItem('__upscope:shortId')));
    }
    else{
      setTimeout(() => {
        if(localStorage.getItem('__upscope:shortId')){
          setShortID(JSON.parse(localStorage.getItem('__upscope:shortId')));
        }
      }, 4000)
    }
  }, [])

  useEffect(() => {
    if(shortId){
      server.post('/web/conv/get-init-messages', {shortID: shortId}).then(res => {
        setMessages(res.data.conversation.messages);
      }).catch(err => {
        console.error(err);
      })
    }
  }, [shortId])

  // To get the total count of sessions
  
  useEffect(() => {

    const cache = JSON.parse(window.localStorage.getItem('aez')) || null;
    if (cache) {
      if (cache.cid !== null) {
        server.get('/web/conv/view', { params: { convId: cache.cid } }).then((d) => {
          if (d.data.conversation) {
            setCid(cache.cid);
            setUid(cache.uid);
            if (cache.userName !== '') {
              setUserName(cache.userName);
              showEzStartChat(false);
            }
           
            if (cache.userEmail !== '') {
              setUserEmail(cache.userEmail);
            }
            setMessages(d.data.conversation.messages);
            setDingHappened(true);
          }
        });
      }
    }
  }, [cid]);

  // Conversations/chat
  useEffect(() => {
    let s = io(endpoint);
    if(shortId) {
      s.on(`dealer-message-${shortId}`, messages => {
          setMessages(messages);
          if(noMessage == false){
          setTypeOfUser(false);
          setNoMessage(true);
          setMessagingAvailable(true);
          
          setNoMessageTimer(null);
          scrollItDown();
          setThankYouMessage(false);
          timerNone = null;
          return () => clearTimeout(timerNone);
        }
      });

      setNoMessageTimer(null);
      //If dealership doesn't answer in 20 seconds send busy response
      if(noMessage == true){
        setMessagingAvailable(true);
        return () => clearTimeout(timerNone);  
      }
      setSocket(s);
    }
    async function getTheInfo(){
      const userInformation = await server.get(`/web/conv/get-visitors-list`).then((d) => {
        return d;
      });
    }
    getTheInfo();
    
    return function cleanup() {
      if (shortId) {
        s.off(`dealer-message-${shortId}`);
      }
    };
    
  }, [shortId]);
  

  function bizDealer(){
    
     server.get(`/biz/conv/dealer-types?cid=${cid}`).then((data) => {
    }
    );
  }

  useEffect(()=>{
    
    
    function bizDealer(){
      const s = io(endpoint);
      
      let timeout = undefined;
      function setTypingToFalse(){
        setUserIsTyping(false);
      }
      server.get(`/biz/conv/dealer-types?cid=${cid}`).then((data) => {
        s.on(`dealer-types-${cid}`, data => {
          if (data == true){
            setUserIsTyping(true);
            setTimeout( setTypingToFalse , 3000);
            
          }else{
            clearTimeout(timeout);
            timeout = setTimeout(setTypingToFalse, 5000);
          }
        });
      
        setSocket(s);

        return function cleanup() {
          s.off(`dealesr-types`);
        }
      }
    );
  }
  bizDealer();
  },[cid]);

  function interacted() {
    if (!cid && !startedConversation) {
      setStartedConversation(true);
      startConversation(); 
      setShortID(JSON.parse(localStorage.getItem('__upscope:shortId')));
    }
  }

  function startConversation() {
    let payload = {
      "user": {
        "name": userName,
        "domain": "rotolosdodgechryslerjeep.com",
        "phone": userPhone
      }
    };

    ReactGA.event({
      category: "User Chatting",
      action: "User is currently chatting.",
    });

    setUserMessage('');
  }

  useEffect(() => {
    console.log("not updating now");
    console.log(videoChatData);
    connectToChatforReal(videoChatData);
  }, [videoChatData])

  function callVideoApi() {
    let userType = 'customer';
    server.get(`/openTalkSession?shortId=${shortId}&userType=${userType}`).then((data) => {
      console.log(data.data.videoSessionData);
      setVideoChatData(prevVideoChatData => ({...data.data.videoSessionData}));
    }).catch((err) => {
    });
  }

  function startFaceChat(data) {
    const data1 = {
      apiKey: data.apiKey,
      sessionId: data.sessionId,
      token: data.token
    }
    connectToChatforReal(data1);
  }

  function endVideoApi() {
    console.log(videoChatData);
    if(Object.keys(videoChatData).length > 0){
      var apiKey = videoChatData.apiKey;
      var sessionID = videoChatData.sessionId;
      var token = videoChatData.token;

      var session = OT.initSession(apiKey, sessionID);
      session.on("sessionDisconnected", function(event) {
        console.log("The session disconnected. " + event.reason);
      });
      session.disconnect(token);
    }
  }

  async function connectToChatforReal(data) {
    const apiKey = data.apiKey;
    const sessionId = data.sessionId;
    const token = data.token;
    var session = OT.initSession(apiKey, sessionId);
    //setSuperSession(session);
    const sessionConnection = session.connect(token, function (error) {
      if (error) {
          console.log("Failed to connect: ", error.message);
      if (error.name === "OT_NOT_CONNECTED") {
          alert("You are not connected to the internet. Check your network connection.");
      }
      } else {
        console.log("Session Connected");
        session.publish();
      }
    });
    session.on("streamCreated", function(event){
        session.subscribe( event.stream );
    });
    
    return (
      <>
      <OTSession style={{width:'100%'}} session={sessionConnection} apiKey={apiKey} sessionId={sessionId} token={token}>
        <OTStreams>
          <OTSubscriber />
        </OTStreams>
        <OTPublisher />
      </OTSession>
      </>
    );
  }
  
  function scrollToBottom(){
    const chatBottom = document.getElementsByClassName('chatBottom');
    chatBottom.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }

  function setPhoneNumber(){
    let payload ={
      "cid": cid,
      "sender": uid,
      "phone": userPhone
    }
    
    server.put('/add-phone', payload)
      .then((d) => {
        setMessages(d.data.conversation.messages);
      }
    );

    if (userName !== '') {
      //showEzStartChat(true);

      const cache = {
        cid,
        uid,
        userPhone
      };
      window.localStorage.setItem('aez', JSON.stringify(cache));
    }

  }

  function sendVehicleSelected(v){
    let payload = {
      "cid": cid,
      "chosenVehicle": v
    }
    
    server.put('/inventories/chosen', payload)
      .then((d) => {

      }
    );
  }



  function sendMessage() {
    let shortID = JSON.parse(localStorage.getItem("__upscope:shortId"));
    let payload = {
      "cid": cid,
      "sender": uid,
      "message": userMessage,
      "name": userName,
      "phone": userPhone,
      "shortID": shortID
    }
    server.put('/web/conv/add-msg', payload).then((d) => {
      setMessages(d.data.conversation.messages);
    });

    if (userName !== '') {
      const cache = {
        cid,
        uid,
        userName,
        userPhone
      };
      window.localStorage.setItem('aez', JSON.stringify(cache));
    }
    
    //If dealership doesn't answer in 20 seconds send busy response
   
      if(noMessage === false){
      
        setTimeout(() => {
          setMessagingAvailable(noMessage);
          scrollItDown();}, 25000);
      }else if(noMessage === true){
        timerNone = setTimeout(() => {setMessagingAvailable(noMessage);}, 25000);
        clearTimeout(timerNone);
        setMessagingAvailable(true);
        scrollItDown();
      }
        
    if(messagingAvailable === false){
      setThankYouMessage(true);
    }else{
      setThankYouMessage(false);
    }

    showEzStartChat(false);
    setNameField(false);
    setUserMessage('');
    sendTypeProgress('');
    setTimeout(() => {scrollItDown();},2);
   
  }

  function sendNotif() {
    server.put('/web/conv/customer-enters')  
    .then((data) => {
    }).catch((err) => {
    });
  }

  
  function sendTypeProgress(v) {
    let payload = {
      "cid": cid,
      "prog": v
    }
    server.put('/web/conv/prog-msg', payload);
  }

  const Message = ({ data }) => {
    return (
      <>
        {!data.sender?
          <>
          <div className="ez-chat-user-message">
            <p>{data.message}</p>
          </div> 
          <br></br>      
          </>
          :
          <>
            <div className="ez-chat-sales-line">
              <div className="ez-chat-sales-message">{data.message}</div>
            </div>
          </>
        }
      </>
    );

  };
  
  // <<<<<<<<<<<<<<<<<< MESSAGING
  // ****************************
  

  

  function setPriceValueServer(priceVal){
    setPriceValue(priceVal);
    fetchInventoryFromServer(priceVal);
  }
  
  function setStatusValueServer(value){
    setStatusVal(value);
    fetchInventoryFromServer(priceValue, value);
  }

  function setModelValueServer(value){
    setModelValue(value);
    fetchInventoryFromServer(priceValue, statusVal, value);
  }

  function setMakeValueServer(value){
    setMakeValue(value);
    fetchInventoryFromServer(priceValue, statusVal, modelValue, value);
  }

  function filters(v){
    if(v === true){
      setFilteredMakes(["all", ...newOptions.data.make[0].Make]);

      setFilteredModels(["all", ...newOptions.data.make[0].Model]);
    }else{
      setFilteredMakes(["all", ...usedOptions.data.make[0].Make]);

      setFilteredModels(["all", ...usedOptions.data.make[0].Model]);
    }
  }

  async function fetchInventoryFromServer(sort = 'Low', isNew = true, model = 'all', make = 'all'){
    
    const result = await server.get(`/inventories?key=marco.com&page=0&sort=${sort}&isNew=${isNew}&model=${model}&make=${make}`);
    setCarData(result.data);
    
    return result;

  }

  useEffect(() => {

    //THIS IS TO GET THE INVENTORY AND FILTER THE DATA
    async function getResults() {
    
      const result = await fetchInventoryFromServer();
      const resultArray = await server.get('/inventories/options/new?key=marco.com');
     
      const resultArrayUsed = await server.get('/inventories/options/used?key=marco.com');

      if(statusVal === true){
        setFilteredMakes(["all", ...resultArray.data.make[0].Make]);

        setFilteredModels(["all", ...resultArray.data.make[0].Model]);
      }else{
        setFilteredMakes(["all", ...resultArrayUsed.data.make[0].Make]);

        setFilteredModels(["all", ...resultArrayUsed.data.make[0].Model]);
      }
      setNewOptions(resultArray);
      setUsedOptions(resultArrayUsed);
    }

    
    async function getHours() {
      //./victoryDelmontInfo.json
    
    
      const hours = await axios.get('./victoryDelmontInfo.json');
      
      //CHANGE THE DOMAIN REGISTERED - 2 of 3
      //const dealerInformation = await axios.get(`https://autoezserver.appspot.com/license?domain=${domain}`);
      const dealerInformation = await axios.get('https://autoezserver.appspot.com/license?domain=rotolosdodgechryslerjeep.com');

      const mondayOpen = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
      .format(new Date(dealerInformation.data.dealerInfo.monOpenTime));
    const mondayClose = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
      .format(new Date(dealerInformation.data.dealerInfo.monCloseTime));

    const tuesdayOpen = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
      .format(new Date(dealerInformation.data.dealerInfo.tueOpenTime));
    const tuesdayClose = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
      .format(new Date(dealerInformation.data.dealerInfo.tueCloseTime));

    const wednesdayOpen = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
      .format(new Date(dealerInformation.data.dealerInfo.wedOpenTime));
    const wednesdayClose = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
      .format(new Date(dealerInformation.data.dealerInfo.wedCloseTime));

    const thursdayOpen = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
      .format(new Date(dealerInformation.data.dealerInfo.thuOpenTime));
    const thursdayClose = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
      .format(new Date(dealerInformation.data.dealerInfo.thuCloseTime));

    const fridayOpen = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
      .format(new Date(dealerInformation.data.dealerInfo.friOpenTime));
    const fridayClose = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
      .format(new Date(dealerInformation.data.dealerInfo.friCloseTime));

    const saturdayOpen = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
      .format(new Date(dealerInformation.data.dealerInfo.satOpenTime));
    const saturdayClose = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
      .format(new Date(dealerInformation.data.dealerInfo.satCloseTime));
    
    const sundayOpen = dealerInformation.data.dealerInfo.sunOpenTime
    const sundayClose = dealerInformation.data.dealerInfo.sunCloseTime
    
    const openHours = [
      mondayOpen, tuesdayOpen, wednesdayOpen, thursdayOpen, fridayOpen, saturdayOpen, sundayOpen
    ]
    const closingHours = [
      mondayClose, tuesdayClose, wednesdayClose, thursdayClose, fridayClose, saturdayClose, sundayClose
    ]
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const dayShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const status = ['Open', 'Close']

      setDealerData(hours.data.dealerInfo);
      setDealerInfoData(hours.data.dealerInfo[0]);
      setStoreHours(hours.data.dealerInfo[0].dealerHours);

      setDealerDataTwo(dealerInformation.data.dealerInfo);

      let day = moment().format("dddd");

      for (let z = 0; z < hours.data.dealerInfo[0].dealerHours.length; z++) {
        if (hours.data.dealerInfo[0].dealerHours[z].day === day) {
          setDow(z);
          break;
        }
      }
    }
    
    /**
     * Claim domain FUNCTION
     */

    async function claimDomain() {
      const currentDomain =  {
        "domain": window.location.hostname
      };
    
      setDomain( currentDomain );
  
    }

    /**
     * Set not accepting screen FUNCTION
     * Check to see if the store hours from dow show closed, set the state of messagingAvailable to false
     * Otherwise set the state of messaging Unavailable.
     * The result will set the states in app.js to show either the unavailable message from ezChatMessageUnavailble
     * or it will show the ezChatChatScreen.
     * @author Marco G.
     */

    async function setNotAcceptingScreen() {
      //CHANGE THE DOMAIN REGISTERED - 2 of 3
      //const dealerInformation = await axios.get(`https://autoezserver.appspot.com/license?domain=${domain}`);
      const dealerInformation = await axios.get('https://autoezserver.appspot.com/license?domain=rotolosdodgechryslerjeep.com');

      //Define each day's opening and closing time
      const mondayOpen = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
        .format(new Date(dealerInformation.data.dealerInfo.monOpenTime));
      const mondayClose = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
        .format(new Date(dealerInformation.data.dealerInfo.monCloseTime));

      const tuesdayOpen = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
        .format(new Date(dealerInformation.data.dealerInfo.tueOpenTime));
      const tuesdayClose = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
        .format(new Date(dealerInformation.data.dealerInfo.tueCloseTime));

      const wednesdayOpen = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
        .format(new Date(dealerInformation.data.dealerInfo.wedOpenTime));
      const wednesdayClose = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
        .format(new Date(dealerInformation.data.dealerInfo.wedCloseTime));

      const thursdayOpen = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
        .format(new Date(dealerInformation.data.dealerInfo.thuOpenTime));
      const thursdayClose = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
        .format(new Date(dealerInformation.data.dealerInfo.thuCloseTime));

      const fridayOpen = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
        .format(new Date(dealerInformation.data.dealerInfo.friOpenTime));
      const fridayClose = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
        .format(new Date(dealerInformation.data.dealerInfo.friCloseTime));

      const saturdayOpen = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
        .format(new Date(dealerInformation.data.dealerInfo.satOpenTime));
      const saturdayClose = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
        .format(new Date(dealerInformation.data.dealerInfo.satCloseTime));

      const currentDay = moment().format("dddd");
      const currentTime = moment().format("hh:mm:ss A");
      if(currentDay === "Sunday" && (currentTime >= mondayClose)){
      }else if(currentDay === "Sunday" && (currentTime >= mondayClose)){
        // setMessagingAvailable(true);
      }else if(currentDay === "Monday" && (currentTime <= mondayOpen || currentTime >= mondayClose)){
        // setMessagingAvailable(true);
      }else if(currentDay === "Tuesday" && (currentTime <= tuesdayOpen || currentTime >= tuesdayClose)){
        // setMessagingAvailable(true);
      }else if(currentDay === "Wednesday" && (currentTime <= wednesdayOpen || currentTime >= wednesdayClose)){
        setMessagingAvailable(true);
      }else if(currentDay === "Thursday" && (currentTime <= thursdayOpen || currentTime >= thursdayClose)){
        setMessagingAvailable(true);
      }else if(currentDay === "Friday" && (currentTime <= fridayOpen || currentTime >= fridayClose)){
        setMessagingAvailable(true);
      }else if(currentDay === "Saturday" && (currentTime >= saturdayClose && currentTime <= saturdayOpen)){
        setMessagingAvailable(true);
      }else{
        setMessagingAvailable(true);
      }
    }

    window.setTimeout(() => {
      if (!dingHappened) {
        setDingHappened(true);
      }
    }, 0);

    getResults();
    getHours();
    loopThroughCalendar();
    setInventoryBox(false);
    setHideCalendar(true);
    setInventoryList(false);
    setTimeBoxVisible(true);
    setNotAcceptingScreen();
    claimDomain();
  }, []);


  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }

  function changeHourPickText(e) {
    let v = e.target.value;
    setSchedTime(v);
  }

  function buildDayStuff() {
    let p = storeHours[dow];
    return (
      <>
        {p.status === 'Open' ?
          <form className="ez-chat-list">

            <ul className="ez-chat-form">
              <li className="ez-chat-list-item">
                <div style={{ padding: '6px', textAlign: 'center' }} >
                  <input className="ez-chat-time-input" onChange={changeHourPickText} value="Morning" id="morning" name="time" type="radio" />
                  <label htmlFor="morning" className="ez-chat-time-labels">
                    <p style={{ fontSize: '11px', margin: 0 }}>Morning</p>
                    <div className="ez-chat-time-slots">{p.openHours[0]}:00 AM - 12:00 PM</div>
                  </label>
                </div>
              </li>
              {p.eveningHours === true ?
                <li className="ez-chat-list-item">
                  <div style={{ padding: '6px', textAlign: 'center' }} >
                    <input className="ez-chat-time-input" onChange={changeHourPickText} value="Afternoon" id="afternoon" name="time" type="radio" />
                    <label htmlFor="afternoon" className="ez-chat-time-labels">
                      <p style={{ fontSize: '11px', margin: 0 }}>Afternoon</p>
                      <div className="ez-chat-time-slots">12:00 PM - 5:00 PM</div>
                    </label>
                  </div>
                </li>
                :
                <li className="ez-chat-list-item">
                  <div style={{ padding: '6px', textAlign: 'center' }} >
                    <input className="ez-chat-time-input" onChange={changeHourPickText} value="Afternoon" id="afternoon-closing" name="time" type="radio" />
                    <label htmlFor="afternoon-closing" className="ez-chat-time-labels">
                      <p style={{ fontSize: '11px', margin: 0 }}>Afternoon</p>
                      <div className="ez-chat-time-slots">12:00 PM - {p.closingHours[0]}:00 PM</div>
                    </label>
                  </div>
                </li>
              }
              {p.eveningHours === true ?
                <li style={{ padding: '6px', textAlign: 'center' }} className="ez-chat-list-item">
                  <div>
                    <input className="ez-chat-time-input" onChange={changeHourPickText} value="Evening" id="evening" name="time" type="radio" />
                    <label htmlFor="evening" className="ez-chat-time-labels">
                      <p style={{ fontSize: '11px', margin: 0 }}>Evening</p>
                      <div className="ez-chat-time-slots">5:00 PM - {p.closingHours[0]}:00 PM</div>
                    </label>
                  </div>
                </li>
                : null
              }
            </ul>
            {scheduledVisit ?
            <>
              <fieldset className="info-fieldsets">
                <input type="text" className="ez-chat-name-field-schedule" placeholder="Name" required="required" value={userName} onChange={(e) => { setUserName(e.target.value); }} />
              </fieldset>
              <fieldset className="info-fieldsets">
                <input type="text" placeholder="Email" required="required" className="ez-chat-name-field-schedule" value={userEmail} onChange={(e) => { setUserEmail(e.target.value); }} />
              </fieldset>
              <div className="ez-chat-scheduler-btns">
                <button type="submit" onClick={scheduleSubmit} name="time" className="ez-chat-submit-time" placeholder="">Schedule</button>
                <button type="submit" onClick={closeCalendar} name="time" className="ez-chat-submit-time" placeholder="">Cancel</button>
              </div>
            </>
            :
            <div className="scheduleMessage">
              <div style={{ marginBottom: "15px" }}>Thank you for scheduling with us! Please check your *Email for confirmation</div>
              <button className="ez-chat-submit-time" onClick={dataFunctions.onShowCalendar}>Reschedule</button>
            </div>
          }
          </form>
          :
          <div style={{ textAlign: 'center', marginTop: '44px' }}>Sorry we are closed on this day!</div>
        }
      </>
    );
  }

  function loopThroughCalendar() {
    let calendarDays = Array.from(calendarDayData);
    const currentDay = moment();
    setDow(currentDay.day());

    for (let i = 0; i < 6; i++) {
      const allWeek = moment().add(i, 'days').format("ddd");
      const allWeekDayNum = moment().add(i, 'days').format("D");
      const allWeekCurrentMonth = moment().add(i, 'days').format("MMM");
      const fullDate = moment().add(i, 'days').format("YYYY-MM-DD")
      const calendarValues = [allWeek, allWeekDayNum, allWeekCurrentMonth, fullDate];

      calendarDays.push(calendarValues);
      setCalendarDayData(calendarDays);

    }
    return calendarDays;
  };

  function setGreeting() {
    const currentTime = moment().format("k");
    if (currentTime >= 1 && currentTime <= 11) {
      return ("Good Morning");
    } else if (currentTime >= 12 && currentTime <= 16) {
      return ("Good Afternoon");
    } else if (currentTime >= 17 && currentTime <= 23) {
      return ("Good Evening");
    } else if (currentTime >= 24) {
      return ("Good Morning");
    }
  }

  function addSelectedVehicle(v) {
    // use real v object passed into this addSelectedVehicle(v) function
    let vehicles = Array.from(selectCarData);
    if (vehicles.length < 1) {
      vehicles.push(v);
      setSelectCarData(selectCarDataVdp);
      sendVehicleSelected(selectCarDataVdp);
    } else if (vehicles.length === 1) {
      vehicles.pop(v);
      vehicles.push(v);
      setSelectCarData(selectCarDataVdp);
      sendVehicleSelected(selectCarDataVdp);
    }
    onRadioOut(true);
    setOpeningScreenBtn(false);
  }

  function removeSelectedVehicle(v) {
    // use real v object passed into this addSelectedVehicle(v) function
    let vehicles = Array.from(selectCarData);
    vehicles.pop(v);
    setSelectCarData(vehicles);

    //Checks to see if there's vehicles then takes the lease/purchase/undecided away
    if (vehicles.length === 0) {
      showSectionTwo(false);
    }
  }

  function addSelectedVehicleVdp(v) {
    // use real v object passed into this addSelectedVehicle(v) function
    let vehicles = Array.from(selectCarDataVdp);
    if (vehicles.length < 1) {
      vehicles.push(v);
      setSelectCarDataVdp(vehicles);
    }
    showYesNo();
  }

  function removeSelectedVehicleVdp(v) {
    // use real v object passed into this addSelectedVehicle(v) function
    let vehicles = Array.from(selectCarDataVdp);
    vehicles.pop(v);
    setSelectCarDataVdp(vehicles);

    //Checks to see if there's vehicles then takes the lease/purchase/undecided away
    if (vehicles.length === 0) {
      showSectionTwo(false);
    }
    setVdpBox(false);
    setInventoryList(true);
    setBackBtnArrow(false);
  }

  function closeCalendar() {
    setShowCalendar(false);
  }

  function scheduleSubmit() {
    let payload = {
      date: schedDate,
      time: schedTime,
      custId: uid,
      name: userName,
      email: userEmail,
      //TODO: Need to make it reflect the current user's domain

      //CHANGE THE DOMAIN REGISTERED - 3 of 3
      //domain: domain
      domain: "rotolosdodgechryslerjeep.com"
    };

    server.post('/web/apt/new', payload);

    setScheduledVisit( false );
  }

  const notifyDealer = () =>{
    if(chatStarted === true){
      setChatStarted(false);
      sendNotif();
    }
  }
  
  function onHideCalendar() {
    setTimeBoxVisible(false);
    setCloseTheCalendar(false);
  }

  function onShowCalendar() {
    setTimeBoxVisible(true);
    setCloseTheCalendar(true);
  }

  function searchModelBlur() {
    if (modelSearchList.length === 1) {
      setSearchModelText(modelSearchList[0]);
      setSearchTyped(false);
    }
  }

  function showYesNo() {
    setInventoryBox(true);
    setAdditionalFeatBox(true);
    setInventoryList(true);
    window.setTimeout(() => {
      document.getElementsByClassName("ez-chat-btn-tabs")[0].style.right = '612px';
    }, 5);

    setDefaultCheckedVal(true);
  }

  function onRadioOut() {
    showSearchModelVisible(true);
    setShowTextField(true);
    showEzChatMainScreen(true);
    setDefaultCheckedSelect(true);
    notifyDealer();
  }

  function closeChatField() {
    showSearchModelVisible(false);
    setShowTextField(false);
    showEzChatMainScreen(false);
  }

  function selectACar(v) {
    setCarIsSelected(true);
    addSelectedVehicle(v);
    setVdpBox(true);
    setInventoryList(false);
    setBackBtnArrow(true);
  }

  function selectACarVdp(v) {
    setCarIsSelected(true);
    addSelectedVehicleVdp(v);
    setVdpBox(true);
    setInventoryList(false);
    setBackBtnArrow(true);
  }

  function cannotSelectACar() {
    setCarIsSelected(false);
    showEzChatMainScreen(true);
    showEditYourInfo(true);
    setShowTextField(true);
    setInventoryList(false);
    setPurchaseInfo('');
  }

  function closeChatBox() {
    setEzChatBox(false);
    closeCalendar(false);
    setSideButtons(false);
    setInventoryBox(false);
    setAdditionalFeatBox(false);
    setDefaultCheckedVal(false);
    setInventoryList(false);
  }

  function openChatBox() {
    setEzChatBox(true);
    setSideButtons(true);
    setInventoryBox(false);
    setOpeningScreenBtn(true);
    closeCalendar(false);
    setAdditionalFeatBox(false);
    setDefaultCheckedVal(false);
    setDefaultCheckedCal(false);
    setDefaultCheckedSelect(false);
    setInventoryList(false);
    showSearchModelVisible(false);
    setShowTextField(false);
    showEzChatMainScreen(false);
  }

  function onSubmit(e) {
    e.preventDefault();
  }
  /* 
    function addSomeSpaceOnScrollBar() {
      let scrollBar = document.getElementsByClassName('ez-chat-no-flex-container')[0];
      scrollBar.setAttribute('id', 'ez-chat-messaging-is-open');
    }
   */
  function showEntryAgain() {
    showSearchModelVisible(true);
    if (purchaseInfo === 'Purchase') {
      showSectionTwo(true);
    } else if (purchaseInfo === 'Lease') {
      showSectionTwo(true);
    } else if (purchaseInfo === 'Undecided') {
      showSectionTwo(true);
    } else if (purchaseInfo === '') {
      showSectionTwo(false);
    }
    showEditYourInfo(false);
  }


  function onChangeCalendar(v, i, date) {
    setSchedDate(date);

    let selectedDate = document.getElementsByClassName('ez-chat-day-slot');
    selectedDate[0].style.backgroundColor = "#bbb";

    for (let g = 1; g < 6; g++) {
      selectedDate[g].style.backgroundColor = "white";
      selectedDate[g].style.color = "#000";
    }

    selectedDate[i].style.backgroundColor = "#002d55";
    selectedDate[i].style.color = "#fff";

    for (let z = 0; z < storeHours.length; z++) {
      if (storeHours[z].dayShort === v) {
        setDow(z);
        break;
      }
    }
  }

  function hideInventory() {
    setInventoryBox(false);
    showEzChatMainScreen(true);
    setInventoryList(false);
    setShowTextField(true);
    showSectionTwo(false);
    showEditYourInfo(true);
    //addSomeSpaceOnScrollBar();
    setVdpBox(false);
    window.setTimeout(() => {
      document.getElementsByClassName("ez-chat-btn-tabs")[0].style.right = '306px';
    }, 5);
  }

  function switchOpeningScreenBtn() {
    setOpeningScreenBtn(false);
    setSideButtons(true);
    notifyDealer();
  }

  function toggleChat() {
    showEzChatMainScreen(!ezChatMainScreen);
    setShowTextField(!showTextField);
  }

  function showNoYes() {
    setInventoryBox(false);
    setAdditionalFeatBox(false);
    setInventoryList(false);
    window.setTimeout(() => {
      document.getElementsByClassName("ez-chat-btn-tabs")[0].style.right = '306px';
    }, 5);

  }

  function toggleCal() {
    setShowCalendar(true);
    setDefaultCheckedCal(true);
  }

  //Formats Price Strings  
  function currencyFormat(num) {
    return '$' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function turnToNum(num) {
    return parseFloat(num.replace(/\$|,/g, ''));
  }

  //Toggles the info on the VDP open or closed
  function toggleVehicleInfo() {
    setVehicleTogggleOne(!vehicleTogggleOne);
    var toggleArrow = document.getElementById('ez-chat-vdp-tog-one');
    if (vehicleTogggleOne === false) {
      toggleArrow.setAttribute('class', 'svg-inline--fa fa-caret-up fa-w-10 ez-chat-vdp-toggle-icon ez-chat-vdp-toggle-icon-closed');
    } else if (vehicleTogggleOne === true) {
      toggleArrow.removeAttribute('class', 'ez-chat-vdp-toggle-icon-closed');
      toggleArrow.setAttribute('class', 'svg-inline--fa fa-caret-up fa-w-10 ez-chat-vdp-toggle-icon');
    }
  }

  //Checks which sections are open and closed to display
  //the chat, inventory, and scheduler and toggle the different screens.
  function toggleInventory(v) {
    let inventoryVal = document.getElementById('ezChatBtnInventoryCheck');
    let selectedVal = document.getElementById('ezChatBtnMessageCheck');
    let calendarVal = document.getElementById('ezChatBtnScheduleCheck');

    let newVal = inventoryVal.checked;
    let newValCal = calendarVal.checked;
    let newSelectVal = selectedVal.checked;

    //Inventory Open / Closed
    if (newVal === true) {
      dataFunctions.setInventoryBox(true);
      dataFunctions.setAdditionalFeatBox(true);
      dataFunctions.setInventoryList(true);
      window.setTimeout(() => {
        document.getElementsByClassName("ez-chat-btn-tabs")[0].style.right = '612px';
      }, 5);
      dataFunctions.setVdpBox(false);
      dataFunctions.setDefaultCheckedVal(true);
      dataFunctions.setOpeningScreenBtn(true);

    } else if (newVal === false) {
      dataFunctions.setInventoryBox(false);
      dataFunctions.setAdditionalFeatBox(false);
      dataFunctions.setInventoryList(false);
      window.setTimeout(() => {
        document.getElementsByClassName("ez-chat-btn-tabs")[0].style.right = '306px';
      }, 5);
      dataFunctions.setDefaultCheckedVal(false);
      setVdpBox(false);
      setBackBtnArrow(false);
      dataFunctions.removeSelectedVehicleVdp(v);
    }

    //Calendar Open / Closed    
    if (newValCal === true) {
      dataFunctions.setShowCalendar(true);
      dataFunctions.setOpeningScreenBtn(false);
      dataFunctions.setDefaultCheckedCal(true);
    } else if (newValCal === false) {
      dataFunctions.setShowCalendar(false);
      dataFunctions.setDefaultCheckedCal(true);
    }

    //Chat Open / Closed
    if (newSelectVal === true) {
      dataFunctions.setOpeningScreenBtn(false);
      dataFunctions.showSearchModelVisible(true);
      dataFunctions.setShowTextField(true);
      dataFunctions.showEzChatMainScreen(true);
    } else if (newSelectVal === false) {
      dataFunctions.showSearchModelVisible(false);
      dataFunctions.setShowTextField(false);
      dataFunctions.showEzChatMainScreen(false);
    }

    //All Closed
    if (newSelectVal === false && newValCal === false && newVal === false) {
      dataFunctions.showSearchModelVisible(false);
      dataFunctions.setShowTextField(false);
      dataFunctions.showEzChatMainScreen(false);
      dataFunctions.setShowCalendar(false);
      dataFunctions.setInventoryBox(false);
      dataFunctions.setAdditionalFeatBox(false);
      dataFunctions.setInventoryList(false);
      window.setTimeout(() => {
        document.getElementsByClassName("ez-chat-btn-tabs")[0].style.right = '306px';
      }, 5);
      dataFunctions.setOpeningScreenBtn(true);
      dataFunctions.setDefaultCheckedSelect(false);
      dataFunctions.setDefaultCheckedCal(false);
      //dataFunctions.setDefaultCheckedVal( false );
      dataFunctions.setVdpBox(false);
    }

  }

  function closeInventory(v) {
    //let inventoryVal = document.getElementById('ezChatBtnInventoryCheck');
    //let newVal = inventoryVal.checked;

    //Inventory

    dataFunctions.setInventoryBox(false);
    dataFunctions.setAdditionalFeatBox(false);
    dataFunctions.setInventoryList(false);
    window.setTimeout(() => {
      document.getElementsByClassName("ez-chat-btn-tabs")[0].style.right = '306px';
    }, 5);

    dataFunctions.setVdpBox(false);
    dataFunctions.setBackBtnArrow(false);

    dataFunctions.setDefaultCheckedVal(false);
    //let newVal = false;

  }

  function connectToChat()  {
    const res = {
      apiKey: '',
      token: '',
      sessionId: ''
    };

    server.get('/openTalkSession', res).then(res => setVideoData(res));

  }

  //HOOK INTO HERE
  const dataFunctions = {videoChatData, setVideoChatData, startFaceChat, session1, saveSession, dow, timeBoxVisible, setShortID, shortId, setDow, interacted, sendTypeProgress, setTimeBoxVisible, selectCarData, setSelectCarData, carData, setCarData, filteredCarData, setFilteredCarData, dealerData, setDealerData, dealerInfoData, setDealerInfoData, storeHours, setStoreHours, searchTyped, setSearchTyped, searchModelText, setSearchModelText, modelSearchList, setModelSearchList, dingHappened, setDingHappened, searchModelVisible, showSearchModelVisible, ezChatBox, setEzChatBox, inventoryBox, setInventoryBox, additionalFeatBox, setAdditionalFeatBox, carIsSelected, setCarIsSelected, hideCalendar, setHideCalendar, sectionTwo, showSectionTwo, ezStartChat, showEzStartChat, ezChatMainScreen, showEzChatMainScreen, showTextField, setShowTextField, inventoryList, setInventoryList, closeTheCalendar, setCloseTheCalendar, editYourInfo, showEditYourInfo, finalMessage, showFinalMessage, purchaseInfo, setPurchaseInfo, calendarDayData, setCalendarDayData, showCalendar, setShowCalendar, socket, setSocket, userMessage, setUserMessage, userName, setUserName, userEmail, setUserEmail, messages, setMessages, cid, setCid, uid, setUid, onShowCalendar, onHideCalendar, closeCalendar, moment, FontAwesomeIcon, axios, library, searchModelBlur, showYesNo, onRadioOut, selectACar, cannotSelectACar, closeChatBox, openChatBox, onSubmit, hideInventory, showEntryAgain, closeInventory, removeSelectedVehicle, Message, io, endpoint, ReactTooltip, date, setDate, buildDayStuff, loopThroughCalendar, sendMessage, onChangeCalendar, makeValue, setMakeValue: setMakeValueServer, modelValue, setModelValue: setModelValueServer, openingScreenBtn, setOpeningScreenBtn, switchOpeningScreenBtn, sideButtons, setSideButtons, changeHourPickText, statusVal, setStatusVal:setStatusValueServer, filteredMakes, setFilteredMakes, filteredModels, setFilteredModels, setGreeting, currencyFormat, toggleChat, toggleCal, showNoYes, closeChatField, defaultCheckedVal, setDefaultCheckedVal, defaultCheckedCal, setDefaultCheckedCal, defaultCheckedSelect, setDefaultCheckedSelect, userIsTyping, setUserIsTyping, vdpBox, setVdpBox, autoOrManual, setAutoOrManual, gasOrElectric, setGasOrElectric, vehicleTogggleOne, setVehicleTogggleOne, toggleVehicleInfo, vehicleTogggleTwo, setVehicleTogggleTwo, vehicleTogggleThree, setVehicleTogggleThree, removeSelectedVehicleVdp, backBtnArrow, setBackBtnArrow, toggleInventory, selectCarDataVdp, setSelectCarDataVdp, selectACarVdp, addSelectedVehicle, turnToNum, filteredPrice, setFilteredPrice, priceValue, setPriceValue:setPriceValueServer, typeOfUser, setTypeOfUser, serviceBtn, setServiceBtn, bodyShopBtn, setBodyShopBtn, dealerDataTwo, setDealerDataTwo, connectToChat, messagingAvailable, setMessagingAvailable, domain, setDomain, callVideoApi, userPhone, setUserPhone, videoApi, setVideoApi, videoToken, setVideoToken, videoSessionId, setVideoSessionId, scrollToBottom, chatBottomRef, setPhoneNumber, endVideoApi, scrollItDown, nameField, setNameField, filters, newOptions, setNewOptions, usedOptions, setUsedOptions, sendNotif, notifyDealer, bizDealer, userInfo, setUserInfo, notValid, setNotValid, thankYouMessage, setThankYouMessage,noName, setNoName, sendVehicleSelected, activeDealers}

  return <ChatContext.Provider value={dataFunctions}>
    {children}
  </ChatContext.Provider>
}

export default ChatContext;