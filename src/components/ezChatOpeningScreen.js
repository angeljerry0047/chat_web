import React, { useContext, useState, useEffect } from 'react';
import server from '../shared/server';
import '../App.css';
import ChatContext from '../context/chatContext';
import EzChatChatScreen from '../components/ezChatChatScreen';
import noAvatar from '../assets/noAvatar.svg'
const OT = require('@opentok/client');
function EzChatOpeningScreen(){
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
            
            setDealerManagerName(dealerInformation.data.adminName);
            
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

    const {activeDealers} = dataFunctions;
    return(
    <>
        {dataFunctions.openingScreenBtn ?
        <div>
            <p style={{paddingLeft:10, fontSize:11, marginBottom:2}}>{dealerDataManagerName}</p>
            <div className="ez-chat-sales-message-container">
                <div className="ez-chat-sales-line">
                    <div className="ez-chat-sales-message">Hello, welcome to {dealerDealershipName}, our sales team is standing by ready to assist.
                    </div>
                </div>
            </div>
            <div className="ez-chat-sales-staff">
                <div className="ez-chat-sales-team-six">
                    {activeDealers.map((dealer, index) => (
                        <div key={index} className="sales-team-avatar">
                            {dealer.avatar?
                                <img style={{width:50, height:50, borderRadius:50}} src={`data:image/png;base64,${dealer.avatar}`} alt={dealer.name} />
                                :
                                <img style={{width:50, height:50}} src={noAvatar} alt={dealer.name} />
                            }
                        </div>
                    ))}
                </div>
                {activeDealers.length > 6?
                <div className="more-than-six">+ More</div>
                : null }
            </div>
            <div style={{color:'#1F67B3', fontWeight:'700', fontSize:10, textAlign:'center', maxWidth:185, margin:'5px auto'}}>{dataFunctions.activeDealers.length} {dealerDealershipName} salespeople are available</div>
        </div>
        :
        null
        }
    </>
    );
}

export default EzChatOpeningScreen;