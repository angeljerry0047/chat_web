import React, { useContext } from 'react';
import '../App.css';
import ChatContext from '../context/chatContext';

function EzChatSearchModel(){
    const {dataFunctions} = useContext(ChatContext);

    function searchModelChanged( e ) {
        const val = String( e.target.value );
        setSearchModelText( val );
        if ( val === '' ) {
          setSearchTyped( false );
          return;
        }
        setSearchTyped( true );
        let list = [
          'Cherokee',
          'Gladiator',
          'Renegade',
          'Wrangler',
          'Compass',
          'Grand Cherokee'
        ];
        if ( val.substr( 0, 2 ).toLowerCase() === 'ch' ) {
          list = [
            'Cherokee'
          ];
        } else if ( val.substr( 0, 2 ).toLowerCase() === 'co' ) {
          list = [
            'Compass',
          ];
        } else if ( val.substr( 0, 2 ).toLowerCase() === 'gl' ) {
          list = [
            'Gladiator'
          ];
        } else if ( val.substr( 0, 2 ).toLowerCase() === 'gr' ) {
          list = [
            'Grand Cherokee'
          ];
        } else if ( val.substr( 0, 1 ).toLowerCase() === 'c' ) {
          list = [
            'Cherokee',
            'Compass'
          ];
        } else if ( val.substr( 0, 1 ).toLowerCase() === 'r' ) {
          list = [
            'Renegade'
          ];
        } else if ( val.substr( 0, 1 ).toLowerCase() === 'w' ) {
          list = [
            'Wrangler'
          ];
        } else if ( val.substr( 0, 1 ).toLowerCase() === 'g' ) {
          list = [
            'Gladiator',
            'Grand Cherokee'
          ];
        }
        setModelSearchList( list );
  
        let filteredData = carData.filter( ( v ) => {
          let car = v.MODEL.toLowerCase();
          if ( car.indexOf( val.toLowerCase() ) !== -1 ) {
            return true;
          }
          return false;
        } );
  
        setFilteredCarData( filteredData );
    }

    function onSearchBarEnter( e ) {
        if ( e.key === "Enter" ) {
          setInventoryBox( true );
        }
    };
    
    return(
    <>
    {dataFunctions.map( q => 
        <div key={dataFunctions}>
        {q.searchModelVisible ?
            <div className="option-two ez-chat-container-one">
                {/*<div className="ez-chat-sales-message-container">
                    <div className="ez-chat-sales-line">
        <div className="ez-chat-sales-message-two"><span className="bold-and-beautiful">Hello</span>, you are connected with the {q.dealerInfoData.dealerName} Sales Team. Choose from our new and pre-owned inventory.*/}
                        <input className="ez-chat-search" type="search" placeholder="Search Model" value={q.searchModelText} onChange={q.searchModelChanged} onKeyPress={q.onSearchBarEnter} onBlur={q.searchModelBlur} />
                            {q.searchTyped ?
                            <div className="ez-search-auto-fill-box">
                                <ul className="ez-search-box-container">
                                {q.modelSearchList.map( ( v, i ) => {
                                    return (
                                    <li key={i} onClick={() => {
                                        q.setSearchModelText( v );
                                        q.setSearchTyped( false );
                                    }}>
                                        {v}
                                    </li>
                                    );
                                }
                                )}{/*END modelSearchList*/}
                                </ul>
                            </div>
                            :
                            <div></div>
                            }{/*END searchTyped*/}
                            {/*<div>
                            <button className="ez-chat-edit-btn" onClick={q.cannotSelectACar}>Skip Search</button>
                            </div>*/}
                        </div>
                    /*</div>
                </div>
            </div>*/
            :
            null
        }{/*END searchModelVisible*/}
        </div>
    )
}
    </>
    );
}
export default EzChatSearchModel;