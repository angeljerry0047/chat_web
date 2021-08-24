import React, { useContext } from 'react';
import Select from 'react-select';
import '../App.css';
import ChatContext from '../context/chatContext';

function EzChatSelectMakeModel(){
    const {dataFunctions} = useContext(ChatContext);
    
    function makeOptions(){
        {dataFunctions.map( q => {
            q.carData.map( p => { 
                return(
                 <>
                    <p>{p.MAKE}</p>);
                 </>
                 )
                }
            )
         }
        )}
    }

    return(
    <>
            {dataFunctions.map( t => {
       {t.carData.map( p => { 
                return(
                   <option key={p.STOCK} value={p.MAKE}>{p.MAKE}</option>
                 )
                }
              )}
            })}

    </>
    );
}
export default EzChatSelectMakeModel;