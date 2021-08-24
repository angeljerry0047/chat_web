import React, {useContext} from 'react';
import '../App.css';
import ChatContext from '../context/chatContext';

function EzChatBackButton(){
    /**
     * Pulls all functions and data from dataFunctions array in
     * ChatContext. Set up mapping using value 'q' => 
     */
    const {dataFunctions} = useContext(ChatContext);
    return (
        <>
        {dataFunctions.map( q=> 
            <div key={dataFunctions}>
            {q.editYourInfo ?
                <div className="ez-chat-edit-btn-container">
                <button className="ez-chat-edit-btn" style={{ color: '#232323' }} onClick={q.showEntryAgain}>Back</button>
                </div>
                :
                null
            }{/*END editYourInfo */}
            </div>
        )
        }
        </>
    );
}

export default EzChatBackButton;