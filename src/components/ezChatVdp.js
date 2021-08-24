import React, { useContext } from 'react';
import '../App.css';
import ChatContext from '../context/chatContext';

function EzChatVdp(){
  /**
   * Pulls all functions and data from dataFunctions array in
   * ChatContext. Use dataFunctions.functionName to reference
  */
  const dataFunctions = useContext(ChatContext);

  return(
    <>
    {dataFunctions.vdpBox ?
    <div className="ez-chat-vdp-container">
      {dataFunctions.selectCarDataVdp.map( d =>
      <div className="ez-chat-vdp-box" key={d.STOCK}>
        <div className="ez-chat-vdp-image-area">
          <img src={/*`https:${*/d.IMAGE/*}`*/} alt="" className="ez-chat-vdp-img"/>
        </div>
        <div className="ez-chat-vdp-title-info-box">
          <h2 className="ez-chat-vdp-title">
            <span className="ez-chat-vdp-year">{d.YEAR}&nbsp;</span>
            <span className="ez-chat-vdp-make">{d.MAKE}&nbsp;</span>
            <span className="ez-chat-vdp-model">{d.MODEL}&nbsp;</span>
            <span className="ez-chat-vdp-model">{d.TRIM}</span>
            {/*<span className="ez-chat-vdp-model">{d.info[11].val}</span>*/}
          </h2>
          <h3 className="ez-chat-vdp-vin">{d.VIN}</h3>
          <h3 className="ez-chat-vdp-stock">#{d.STOCK}</h3>
        </div>
        <div className="ez-chat-vdp-pricing-container">
          {d.NEW === true ?
          <div className="ez-chat-vdp-pricing-box">
            <p className="ez-chat-vdp-price-title">MSRP</p>
            <p className="ez-chat-vdp-price-msrp">{d.MSRP}</p>
          </div>
          :
          null
          }
          {d.NEW === true ?
          <div className="ez-chat-vdp-pricing-box">
            <p className="ez-chat-vdp-price-title">Savings Up To</p>
            <p className="ez-chat-vdp-price-discount">{
                dataFunctions.currencyFormat(dataFunctions.turnToNum(d.MSRP) - dataFunctions.turnToNum(d.NOW))
              }</p>
          </div>
          :
          null
          }
          <div className="ez-chat-vdp-pricing-box">
            <p className="ez-chat-vdp-price-title" style={{color:'darkgreen'}}>Our Price</p>
            <p className="ez-chat-vdp-price">{d.NOW}</p>
          </div>
        </div>
        <div className="ez-chat-vdp-scroll-container">
          <div className="ez-chat-vdp-info-container">
            {dataFunctions.gasOrElectric ?
            <div className="ez-chat-vdp-info-box">
              <dataFunctions.FontAwesomeIcon icon="gas-pump" className="ez-chat-vdp-info-icon"/>

              <p className="ez-chat-vdp-gas">{d.GASCITY}/{d.GASHWY}</p>
              {/*<p className="ez-chat-vdp-gas">{d.info[28].val}/{d.info[29].val}</p>*/}
            </div>
            :
            <div className="ez-chat-vdp-info-box">
              <dataFunctions.FontAwesomeIcon icon="charging-station" className="ez-chat-vdp-info-icon"/>
              <p className="ez-chat-vdp-gas">{d.ELECTRIC}</p>
            </div>
            }
            {dataFunctions.autoOrManual ?
            <div className="ez-chat-vdp-info-box">
              <img src={require('../assets/automatic.png')} alt="" className="ez-chat-vdp-info-icon"/>
              <p className="ez-chat-vdp-transmission">{d.TRANSMISSION}</p>
              {/*<p className="ez-chat-vdp-transmission">{d.info[15].val}</p>*/}
            </div>
            :
            <div className="ez-chat-vdp-info-box">
              <img src={require('../assets/manual.png')} alt="" className="ez-chat-vdp-info-icon"/>
              <p className="ez-chat-vdp-transmission">{d.TRANSMISSION}</p>
              {/*<p className="ez-chat-vdp-transmission">{d.info[17].val}</p>*/}
            </div>
            }
            <div className="ez-chat-vdp-info-box">
              <img src={require('../assets/driveTrain.png')} alt="" className="ez-chat-vdp-info-icon"/>
              <p className="ez-chat-vdp-drivetrain">{d.DRIVETRAIN}</p>
              {/*<p className="ez-chat-vdp-drivetrain">{d.info[22].val}</p>*/}
            </div>
            <div className="ez-chat-vdp-info-box">
              <img src={require('../assets/engineSize.png')} alt="" className="ez-chat-vdp-info-icon"/>
              <p className="ez-chat-vdp-engine-size">{d.ENGINE}</p>
              {/*<p className="ez-chat-vdp-engine-size">{d.info[19].val}</p>*/}
            </div>
          </div>
          <div className="ez-chat-vdp-color-container">
            <div className="ez-chat-vdp-color-box">
              <div className="ez-chat-vdp-color-circle"></div>
              <div className="ez-chat-vdp-color-name">{d.COLOR}</div>
            </div>
            <div className="ez-chat-vdp-color-box">
              <div className="ez-chat-vdp-color-circle"></div>
              <div className="ez-chat-vdp-color-name">{d.INTCOLOR}</div>
              {/*<div className="ez-chat-vdp-color-name">{d.info[26].val}</div>*/}
            </div>
          </div>
          <div className="ez-chat-vdp-toggle-list">
            <div className="ez-chat-vdp-toggle-header" onClick={dataFunctions.toggleVehicleInfo}>
              <h3>Vehicle Info</h3>
              <dataFunctions.FontAwesomeIcon icon="caret-down" className="ez-chat-vdp-toggle-icon" id="ez-chat-vdp-tog-one"/>
            </div>
            {dataFunctions.vehicleTogggleOne ?
            <div className="">
              <ul className="ez-chat-vdp-details">
                <li>{d.detail}</li>
              </ul>
            </div>
            :
            null
            }
          </div>
          {/*<div className="ez-chat-vdp-toggle-list">
            <div className="ez-chat-vdp-toggle-header">
              <h3>Equipment Detail</h3>
              <dataFunctions.FontAwesomeIcon icon="caret-down" className="ez-chat-vdp-toggle-icon"/>
            </div>
            {dataFunctions.vehicleTogggleTwo ?
            <div className="">
              <ul>
                <li></li>
              </ul>
            </div>
            :
            null
            }
          </div>
          <div className="ez-chat-vdp-toggle-list">
            <div className="ez-chat-vdp-toggle-header">
              <h3>Generic</h3>
              <dataFunctions.FontAwesomeIcon icon="caret-down" className="ez-chat-vdp-toggle-icon"/>
            </div>
            {dataFunctions.vehicleTogggleThree ?
            <div className="">
              <ul>
                <li></li>
              </ul>
            </div>
            :
            null
            }
          </div>*/}
        </div>
        <div className="ez-chat-vdp-btn-section">
        <a href={d.STICKER} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none', display:'block', textAlign:'center'}} className="ez-chat-vdp-btn">Window Sticker</a>
        <button className="ez-chat-vdp-btn" onClick={dataFunctions.addSelectedVehicle}>Add to chat</button>
      </div>
      </div>
      
  )}

    
    </div>
    
          :
          null
          }
    </>
  );


}

export default EzChatVdp;