import React, {useState, useEffect, useContext} from 'react';
import Dialog from 'react-dialog';
import { CustomDialog, useDialog } from 'react-st-modal';
import { io, endpoint } from '../shared/socket';
import Server from '../shared/server'
// import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import ChatContext from '../context/chatContext';

function CustomDialogContent({acceptFaceChat, d, unableFaceChat}) {
  const dataFunctions = useContext(ChatContext);
  // use this hook to control the dialog
  const dialog = useDialog();

  const [value, setValue] = useState();

  const acceptFaceCall = () => {
    acceptFaceChat(d);
    // dataFunctions.connectToChatforReal(dataFunctions.sesson1);
  }

  return (
    <div style={{textAlign: 'center', marginBottom: '20px'}}>
      <h2>Dealer wants to start a video call with you.</h2>
      <button style={{marginRight: '10px'}}
        onClick={() => {
          acceptFaceCall();
          dialog.close(value);
        }}
      >
        Accept
      </button>
      <button
        className="mb-5"
        onClick={() => {
          unableFaceChat();
          dialog.close(value);
        }}
      >
        Ignore
      </button>
    </div>
  );
}

const EzFaceChatDialog = () => {
  const { server } = Server();
  const dataFunctions = useContext(ChatContext);
  const [session, setSession] = useState({});

  let  [,setState]=useState();

  const acceptFaceChat = (d) => {
    dataFunctions.startFaceChat(d);
    dataFunctions.setVideoChatData(d);
  }

  const sendMessage = () => {
    server.get('/video/stop')
      .then((d) => {
      }).catch(err => console.error(err));
  }

  const unableFaceChat = (d) => {
    sendMessage();
  }

  useEffect(() => {
    let shortID = JSON.parse(localStorage.getItem('__upscope:shortId'));
    const s = io(endpoint);
    s.on(`dealer-video-new-${shortID}`, async (d) => {
      dataFunctions.saveSession({...d});
      setSession({...d});
      setState({});
      const result = await CustomDialog(<CustomDialogContent acceptFaceChat={acceptFaceChat} unableFaceChat={unableFaceChat} d={d}/>, {title: 'Warning', showCloseIcon: true});
    });
  }, [])

  return (
    <div>
    </div>
  )
}

export default EzFaceChatDialog;