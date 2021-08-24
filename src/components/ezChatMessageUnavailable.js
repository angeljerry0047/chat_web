import React from 'react';
import '../App.css';
//import ChatContext from '../context/chatContext';

function EzChatMessageUnavailable(){
    /**
     * Pulls all functions and data from dataFunctions array in
     * ChatContext. Use dataFunctions.functionName to reference
    */
    //const dataFunctions = useContext(ChatContext);
   
    return(
    <>
      <div className="" style={{padding:10, paddingBottom:0}}>
       The dealership is currently closed. Please leave your information. 
      </div>
      <form style={{width:'90%', margin:10,}}>
        <input className="ez-chat-available-inputs" placeholder="Name"></input>
        <input className="ez-chat-available-inputs" placeholder="Email"></input>
        <input className="ez-chat-available-inputs" placeholder="Phone"></input>
        <textarea className="ez-chat-available-inputs" placeholder="Message"/>
        <button className='ez-chat-submit-btn'>Submit</button>
      </form>
    </>
  )
}

export default EzChatMessageUnavailable;