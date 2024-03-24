import React, { useState, useRef, useEffect } from 'react';
import Client from '../LiveCollab/Client';
import LiveEditor from '../LiveCollab/LiveEditor';
import "../../styles/liveEditor.css"
import "../../styles/liveHome.css"
import { initSocket } from '../../socket';
import ACTIONS from '../../Actions';
import {useLocation, useNavigate, Navigate, useParams} from 'react-router-dom';
import toast from "react-hot-toast"


export default function LiveCollabEditorPage() {

  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));


      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later');
        reactNavigator('/LiveHome');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state?.username,

      });

      //Listening for joined event
      socketRef.current.on(ACTIONS.JOINED, ({clients, username, socketId}) => {
        if(username !== location.state?.username) {
          toast.success(`${username} joined the room`);
          console.log(`${username} joined`);
        }
        setClients(clients);
        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId,
        }); 
      }) 

      //Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({socketId, username}) => {
        toast.success(`${username} left the room`);
        setClients((prev) => {
          return prev.filter(client => client.socketId !== socketId)
        })

      })
    }
    init();
   
  },[roomId, location.state?.username, reactNavigator])

  async function copyRoomId() {
    try{
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
    }
  }

  function leaveRoom() {
    reactNavigator('/LiveHome');
}

function joinchatRoom(){
  reactNavigator('/LiveChat', {username: location.state?.username});
}

if(!location.state){
  return <Navigate to="/LiveHome" />
}
    

  return (
    <div className='livemainWrap'>

      <div className='aside'>
        <div className='asideInner'>
          <div className='liveLogo'>

          <center><h3>Connected</h3></center>
          <div className="clientsList">
            {
              clients.map((client) => (
                <Client 
                      key={client.socketId} 
                      username={client.username}
                />
              ))      
            }
          </div>
          </div>
        </div>

        <button className='liveCollabHomebtn joinchatBtn' onClick={joinchatRoom}>Join Chat</button>
        <button className='liveCollabHomebtn copyBtn' onClick={copyRoomId}>Copy ROOM ID</button>
        <button className='liveCollabHomebtn leaveBtn' onClick={leaveRoom}>Leave</button>

      </div>

      <div className='liveeditorWrap'>
          <LiveEditor 
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {codeRef.current = code;}}/>
        </div>

    </div>
  )
}
