import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import ChatContext from '../context/chatContext';
import { library } from '@fortawesome/fontawesome-svg-core';
import server from '../shared/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faTimes, faUserCircle, faLaughBeam, faPaperPlane, faAngleRight, faAngleLeft, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

library.add( faAngleRight, faCaretDown, faCaretUp, faTimes, faUserCircle, faLaughBeam, faPaperPlane, faAngleLeft, faCalendarAlt );

function EzChatHeader(){
    /**
     * Pulls all functions and data from dataFunctions array in
     * ChatContext. Use dataFunctions.functionName to reference
     */
    const dataFunctions = useContext(ChatContext);
    const [dealerDataManagerName, setDealerManagerName] = useState([]);
    const [dealerManagerPosition, setDealerManagerPosition] = useState([]);
    const [dealerDealershipName, setDealerDealershipName] = useState('');
    const [dealerDataManagerAvatar, setDealerDataManagerAvatar] = useState([]);
    const [image, setImage] = useState({});
    //const [currentUser, setCurrentUser] = useState(dataFunctions.userInfo.data);
    const currentUser = dataFunctions.userInfo;
    useEffect(() => {
        async function getAdminDealerInfo() {

            const dealerInformation = await server.get('/license?domain=rotolosdodgechryslerjeep.com');
            
            setDealerManagerName(dealerInformation.data.dealerInfo.managerName);
            
            setDealerDataManagerAvatar(dealerInformation.data.dealerInfo.managerAvatar);
           
           
            setDealerManagerPosition(dealerInformation.data.dealerInfo.managerPosition);
            
            setDealerDealershipName(dealerInformation.data.dealerInfo.name);
            
            if(dealerDataManagerAvatar === null){
                return null;
            }else{
               setImage(dealerDataManagerAvatar);
            }
        }
        getAdminDealerInfo();
    }, []);
   
    const ManagerImage = () => {
        if(dealerDataManagerAvatar == null){
            return null;
        }else{
           return(
            <>
            <img src={`data:image/png;base64,${dealerDataManagerAvatar}`}alt="Avatar" className="avatar" />
            </>
           )
        }
    }
    return(
        <>
            <div key={dataFunctions} className="ez-chat-header">
                <FontAwesomeIcon icon="times" className="ez-chat-escape-two" onClick={dataFunctions.closeChatBox} />
                {dataFunctions.typeOfUser ?
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', maxWidth:220, marginBottom:10}}>
                    <ManagerImage/>
                    <div>
                        <p className="ez-chat-gm-line">{dealerDataManagerName}</p>
                        <p className="ez-chat-heading-line-two">{dealerManagerPosition}</p>
                    </div>
                </div>    
                :
                <>
                {Object.keys(currentUser).map((item, i) => (
                    <div key={i}>
                         <img src={`data:image/png;base64,${currentUser[item].avatar}`} alt="Avatar" className="avatar" />
                         <p className="ez-chat-gm-line"> {currentUser[item].name}</p>
                         <p className="ez-chat-heading-line-two">{currentUser[item].title}</p>
                    </div>
                ))}
                </> 
                }
            </div>
        </>
    )
}
export default EzChatHeader;