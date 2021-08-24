import React, { useContext } from 'react';
import '../App.css';
import ChatContext from '../context/chatContext';

function EzChatFinalMessage(){
  /**
   * Pulls all functions and data from dataFunctions array in
   * ChatContext. Use dataFunctions.functionName to reference
  */
  const dataFunctions = useContext(ChatContext);

  return(
    <>
    {dataFunctions.finalMessage ?
      <div>
        <p>Thank you for choosing {dataFunctions.dealerInfoData.dealerName}, if you would like to download a transcript of this conversation please click the button below. </p>
        <button className="ez-chat-submit-time">Download Transcript</button>
      </div>
      :
      null
    }{/*END finalMessage*/}
    </>
    );
}
export default EzChatFinalMessage;