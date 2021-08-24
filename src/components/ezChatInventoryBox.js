import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import ChatContext from '../context/chatContext';
import EzChatVdp from './ezChatVdp';

function EzChatInventoryBox(){
  /**
   * Pulls all functions and data from dataFunctions array in
   * ChatContext. Use dataFunctions.functionName to reference
  */
  const dataFunctions = useContext(ChatContext);
  const [callForPrice, setCallForPrice] = useState(true);
  
  useEffect(()=>{
  
    const chatPriceButton = () => {
      var carData = dataFunctions.carData;
  
      for(var i; i = 0; i++){
        if(carData[i].sellingprice === 0){
          setCallForPrice(false);
        } else {
          setCallForPrice(true);
        }
      }
    }
    chatPriceButton();
  });

  function priceChange(e){
    let priceVal = e.target.value;

    dataFunctions.setPriceValue(priceVal);
  }

  function makeChange(e){
    let makeVal = e.target.value;
    dataFunctions.setMakeValue(makeVal);
  }
  
  function modelChange(e){
    let modelVal = e.target.value;
    dataFunctions.setModelValue(modelVal);
    
  }

  function isItNew(v){
    dataFunctions.setStatusVal(v);
    dataFunctions.filters(v);
  }

  

  return (
    <> 
      <div>
        <div>
        {dataFunctions.inventoryBox ?
        <div className="ez-chat-inventory-box-container">
          <div className="ez-chat-inventory-wrap">
            <div className="ez-chat-inventory-icons">
              {dataFunctions.backBtnArrow ?
                <dataFunctions.FontAwesomeIcon icon="arrow-left" className="ez-chat-back-btn-one" onClick={dataFunctions.removeSelectedVehicleVdp} />
              :
              null
              }
              <label htmlFor="ezChatBtnInventoryCheck"><dataFunctions.FontAwesomeIcon icon="times" className="ez-chat-escape-three"  /></label>
              <input name="ez-chat-starting-btn" id="ezChatBtnInventoryCheck" value="Inventory" style={{display:'none'}} defaultChecked={dataFunctions.defaultCheckedVal}  onClick={dataFunctions.toggleInventory} type="checkbox" />
            </div>
            {dataFunctions.inventoryList ?
            <div>
            <div className="ez-chat-filters-box">
              {/* <p className="ez-chat-padding">Please select your desired vehicle:</p> */}
                <form className="center-form-two">
                  <div className="flex-items" style={{paddingTop:10}}>
                    <input type="radio" defaultChecked name="newStatus" id="newVehicle" value="true" onChange={()=>{isItNew(true)}} />
                    <label className="margin-right" htmlFor="newVehicle">New</label>
                  </div>
                  <div className="flex-items" style={{paddingTop:10}}>
                    <input type="radio" name="newStatus" id="usedVehicle" value="false" onChange={()=>{isItNew(false)}} />
                    <label className="margin-right" htmlFor="usedVehicle">Pre-Owned</label>
                  </div>
                </form>
                <div>
                  <select className="ez-chat-inventory-display-select" onChange={makeChange}>
                  {
                    dataFunctions.filteredMakes.map((data) =>{
                      if(data === 'all'){
                        return (
                          <option key={'all'} value="all">Select Make</option>
                        )
                      } else {
                        return (
                          <option key={data._id} value={data._id}>{data._id} ({data.count}) </option>
                          );   
                        }
                      }
                      )
                    }
                  </select>
                  <select className="ez-chat-inventory-display-select" onChange={modelChange}>
                    {
                      dataFunctions.filteredModels.map((data) =>{
                        if(data === 'all'){
                          return (
                            <option key={'all'} value="all">Select Model</option>
                          )
                        } else {
                          return (
                          <option key={data._id} value={data._id}>{data._id} ({data.count}) </option>
                          );   
                        }
                      })
                      } 
                  </select>
                  <select className="ez-chat-inventory-display-select" id="ez-chat-price-sort" value={dataFunctions.priceValue} onChange={priceChange}>
                    <option value="Low">Price Low to High</option>
                    <option value="High">Price High to Low</option>
                  </select>
                </div>
              </div>
              <ul className="ez-chat-inventory-box">
                {dataFunctions.carData.map( p =>
                  <li key={p.vin} style={{margin:' 2px 0 2px 8px'}}>
                    <div className="ez-chat-inventory-box-card">
                      <div className="ez-chat-inventory-image-box">
                        <img className="ez-chat-inventory-image" src={ /*`https:${*/p.imagelist[0]/*}`*/ } alt="" />
                      </div>
                      <div className="ez-chat-middle-row">
                        <div className="ez-chat-vehicle-details" style={{ paddingLeft: '8px' }}>
                          <h3 className="ez-chat-heading-three">
                            <span className="year">{p.year}&nbsp;</span>
                            <span className="make">{p.make}&nbsp;</span>
                            <span className="model">{p.model}&nbsp;</span>
                          </h3>
                          <p className="vin">{p.vin}</p>
                          <p className="stock">#{p.stock}</p>
                          <p className="miles"></p>
                          <p className="ext-color">{p.extcolor}</p>
                        </div>
                      </div>
                      <div style={{ marginLeft: '4px', textAlign: 'center' }}>
                      {/* {(() => {
                          if(p.sellingprice === 0){
                            return (
                              <p className="ez-chat-price">Chat For Price</p>
                            );
                          } else {
                            return (
                              <p className="ez-chat-price">${p.sellingprice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>
                            );
                          }
                        })} */}
                        {callForPrice ?
                        <p className="ez-chat-price">{p.sellingprice.toString().replace(/(\$?)([\d,]+(?!\d))/g, "$$$2").replace(/\B(?=(?:\d{3})+(?!\d))/g, ',').replace(/(?:^(\$?)0$)/,"")}</p>
                        :
                        <p className="ez-chat-price">Chat For Price</p>
                        }
                        <button className="ez-chat-select-button" onClick={
                          () => {
                            dataFunctions.selectACarVdp( {
                              YEAR: p.year,
                              MAKE: p.make,
                              MODEL: p.model,
                              WAS: "",
                              NOW: p.sellingprice,
                              VIN: p.vin,
                              TRIM: p.trim,
                              STOCK: p.stock,
                              COLOR: p.extcolor,
                              IMAGE: p.imagelist[0],
                              detail: p.detail,
                              packages: p.packages,
                              INTCOLOR: p.intcolor,
                              GASCITY: p.GASCITY,
                              GASHWY: p.GASHWY,
                              DRIVETRAIN: p.DRIVETRAIN,
                              ENGINE: p.ENGINE,
                              FUEL: p.FUEL,
                              ELECTRIC: p.ELECTRIC,
                              HYBRID: p.HYBRID,
                              MSRP: p.price1,
                              STICKER: p.sticker,
                              TRANSMISSION: p.trans,
                              NEW: p.type,
                            } );
                          }}>Details</button>
                      </div>
                    </div>
                  </li>
                )}{/*END carData.map*/}
                <hr />
                {dataFunctions.additionalFeatBox ?
                  <div className="ez-chat-additional-box">
                    <div className="ez-chat-container-one">
                      <p className="ez-chat-sorry-para">If we do not have your desired vehicle. Please give us more information so that we can help find the vehicle you are looking for.</p>
                      <button className="ez-chat-submit-time" onClick={dataFunctions.hideInventory}>Chat with sales team</button>
                    </div>
                  </div>
                  :
                  null
                }{/*END additionalFeatBox*/}
              </ul>
            </div>
            :
            null
            }{/*END inventoryList*/}
            
            <EzChatVdp/>
          </div>
        </div>
        :
        null
      }{/*END inventoryBox*/}
      </div>
    </div>
  </>
  )
}

export default EzChatInventoryBox;