import React, { useContext } from 'react';
import '../App.css';
import ChatContext from '../context/chatContext';
function EzChatSelectedVehicles(){
    /**
     * Pulls all functions and data from dataFunctions array in
     * ChatContext. Use dataFunctions.functionName to reference
     */
    const dataFunctions = useContext(ChatContext);
    return (
        <>
        <div key={dataFunctions}>
        {dataFunctions.carIsSelected ?
            <div className="ez-chat-inventory-box-card" style={{ padding: '0' }}>
            <ul className="ez-chat-middle-row" style={{ width: '100%' }}>
                {dataFunctions.selectCarData.map( d =>
                <li key={d.STOCK} className="selected-vehicle-list-item">
                    <div className="ez-chat-selected-vehicle-details">
                        <div className="ez-chat-inventory-image-box">
                            <img className="ez-chat-inventory-image" src={ /*`https:${*/d.IMAGE/*}`*/ } alt="" />
                        </div>
                        <div className="ez-chat-vehicle-details" style={{ width: '175px' }}>
                            <h3 className="ez-chat-heading-three">
                                <span className="year">{d.YEAR}&nbsp;</span>
                                <span className="make">{d.MAKE}&nbsp;</span>
                                <span className="model">{d.MODEL}&nbsp;</span>
                            </h3>
                            <p className="vin">{d.VIN}</p>
                            <p className="stock">#{d.STOCK}</p>
                            <p className="miles"></p>
                            <p className="ext-color">{d.COLOR}</p>
                        </div>
                    <div>
                        <button className="ez-chat-remove-button" onClick={dataFunctions.removeSelectedVehicle}>Remove</button>
                    </div>
                    </div>
                    <hr style={{marginBottom:0}}/>
                </li>
                )}
            </ul>
            </div>
            :
            <div></div>
        }{/*END carIsSelected*/}
        </div>
        </>
    );
}
export default EzChatSelectedVehicles;