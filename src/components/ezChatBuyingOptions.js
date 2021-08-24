import React, {useContext} from 'react';
import '../App.css';
import ChatContext from '../context/chatContext';

function EzChatBuyingOptions(){
    /**
   * Pulls all functions and data from dataFunctions array in
   * ChatContext. Use dataFunctions.functionName to reference
   */
  const dataFunctions = useContext(ChatContext);
  return ( 
  <> 
    <div>
    {dataFunctions.sectionTwo ?
      <div className="option-radio options">
        <div className="">
          <div className="ez-chat-sales-message-container">
            <div className="ez-chat-sales-line ez-chat-sales-message-two" style={{margin:'0 auto',}}>
              <div className="">Select preference:</div>
              <form className="center-form" style={{ margin: '3px auto' }}>
                <div className="flex-items lease-purchase">
                  <label className="margin-right" htmlFor="purchaseVehicle">Purchase</label>
                  <input type="radio" className="ez-chat-purchase-input" name="user-input" id="purchaseVehicle" checked={dataFunctions.purchaseInfo === "Purchase"} onClick={() => dataFunctions.setPurchaseInfo( 'Purchase' )} value="Purchase" onChange={dataFunctions.onRadioOut} />
                </div >
                <div className="flex-items lease-purchase">
                  <label className="margin-right" htmlFor="leaseVehicle">Lease</label>
                  <input type="radio" className="ez-chat-purchase-input" name="user-input" id="leaseVehicle" checked={dataFunctions.purchaseInfo === "Lease"} onClick={() => dataFunctions.setPurchaseInfo( 'Lease' )} value="Lease" onChange={dataFunctions.onRadioOut} />
                </div>
                <div className="flex-items lease-purchase">
                  <label className="margin-right" htmlFor="undecided">Undecided</label>
                  <input type="radio" className="ez-chat-purchase-input" name="user-input" id="undecided" checked={dataFunctions.purchaseInfo === "Undecided"} onClick={() => dataFunctions.setPurchaseInfo( 'Undecided' )} value="Undecided" onChange={dataFunctions.onRadioOut} />
                </div>
              </form>
            </div>
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

export default EzChatBuyingOptions;