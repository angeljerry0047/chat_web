import React, { useContext } from 'react';
import '../App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faTimes, faUserCircle, faLaughBeam, faPaperPlane, faAngleRight, faAngleLeft, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import ChatContext from '../context/chatContext';

import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';

library.add(faAngleRight, faCaretDown, faCaretUp, faTimes, faUserCircle, faLaughBeam, faPaperPlane, faAngleLeft, faCalendarAlt);

function EzChatVideoScreen() {
  /**
   * Pulls all functions and data from dataFunctions array in
   * ChatContext. Use dataFunctions.functionName to reference
  */
  const dataFunctions = useContext(ChatContext);

  return (
    <>
    <OTSession style={{width:'100%'}} apiKey={dataFunctions.videoApi} sessionId={dataFunctions.videoSessionId} token={dataFunctions.videoToken}>
      <OTStreams>
        <OTSubscriber />
      </OTStreams>
      <OTPublisher />
    </OTSession>
    </>
  );
}

export default EzChatVideoScreen;