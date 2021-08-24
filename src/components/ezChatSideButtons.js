import React, { useContext } from 'react';
import '../App.css';
import ChatContext from '../context/chatContext';

function EzChatSideButtons(){
    /**
     * Pulls all functions and data from dataFunctions array in
     * ChatContext. Use dataFunctions.functionName to reference
    */
    const dataFunctions = useContext(ChatContext);
   
    return(
    <>
    {dataFunctions.sideButtons ?
    <div className="ez-chat-btn-tabs">
        <form className="ez-chat-starting-button-container">
            <fieldset className="ez-chat-starting-button">
                <label className="ez-chat-starting-label" htmlFor="ezChatBtnMessageCheck">
                    <dataFunctions.FontAwesomeIcon style={{fontSize:'1.3rem'}} icon="comment" data-tip="Speak to sales team."/>
                    <dataFunctions.ReactTooltip place="left"/>
                </label>
                <input className="ez-chat-starting-radio" name="ez-chat-starting-btn" id="ezChatBtnMessageCheck" value="Messaging"type="checkbox" defaultChecked={dataFunctions.defaultCheckedSelect} onClick={dataFunctions.toggleInventory}/>
            </fieldset>          
            <fieldset className="ez-chat-starting-button">
                <label style={{display:'flex'}}  className="ez-chat-starting-label" htmlFor="ezChatBtnInventoryCheck">
                    <dataFunctions.FontAwesomeIcon style={{fontSize:'1.3rem'}} icon="car" data-tip="Select New / Pre-Owned Vehicles"/>
                    <dataFunctions.ReactTooltip place="left"/>
                </label>
                <input className="ez-chat-starting-radio" name="ez-chat-starting-btn" id="ezChatBtnInventoryCheck" value="Inventory"  defaultChecked={dataFunctions.defaultCheckedVal}  onClick={dataFunctions.toggleInventory} type="checkbox" />
            </fieldset>
            <fieldset className="ez-chat-starting-button">
                <label style={{display:'flex'}} className="ez-chat-starting-label" htmlFor="ezChatBtnScheduleCheck">
                    <dataFunctions.FontAwesomeIcon style={{fontSize:'1.3rem'}} icon="calendar-alt" data-tip="Schedule Dealer Visit"/>
                    <dataFunctions.ReactTooltip place="left"/>
                </label>
                <input className="ez-chat-starting-radio" defaultChecked={dataFunctions.defaultCheckedCal} name="ez-chat-starting-btn" id="ezChatBtnScheduleCheck" value="Schedule"  onClick={dataFunctions.toggleInventory} type="checkbox" />
            </fieldset>
            {/*
            <fieldset className="ez-chat-starting-button">
                <label style={{display:'flex'}}  className="ez-chat-starting-label" htmlFor="ezChatBtnInventoryService">
                    <dataFunctions.FontAwesomeIcon style={{fontSize:'1.3rem'}} icon="wrench" data-tip="Schedule Service Appointment"/>
                    <dataFunctions.ReactTooltip place="left"/>
                </label>
                <input className="ez-chat-starting-radio" name="ez-chat-starting-btn" id="ezChatBtnInventoryService" value="Inventory"  defaultChecked={dataFunctions.defaultCheckedVal}  onClick={toggleInventory} type="checkbox" />
            </fieldset>
            <fieldset className="ez-chat-starting-button">
                <label style={{display:'flex'}} className="ez-chat-starting-label" htmlFor="ezChatBtnScheduleBody">
                    <dataFunctions.FontAwesomeIcon style={{fontSize:'1.3rem'}} icon="car-crash" data-tip="Schedule Body Shop Appointment"/>
                    <dataFunctions.ReactTooltip place="left"/>
                </label>
                <input className="ez-chat-starting-radio" defaultChecked={dataFunctions.defaultCheckedCal} name="ez-chat-starting-btn" id="ezChatBtnScheduleBody" value="Schedule"  onClick={toggleInventory} type="checkbox" />
            </fieldset>*/}
        </form>
    </div>
    :
    null
    }
    </>
    );
}

export default EzChatSideButtons;