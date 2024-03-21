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
  const location = useLocation();
  const {roomId} = useParams();
  const reactNavigator = useNavigate();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
     // socketRef.current.emit(ACTIONS.JOIN, {
       // roomId,
        //username: location.state?.username,

      //});

   
    }
    init();
  },[])

  const [clients, setClients] = useState([
    {socketId: 1, username: 'Thanuka'},
  ]);

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

        <button className='btn joinchatBtn'>Join Chat</button>
        <button className='btn copyBtn' onClick={copyRoomId}>Copy ROOM ID</button>
        <button className='btn leaveBtn' onClick={leaveRoom}>Leave</button>

      </div>

      <div className='liveeditorWrap'>
          <LiveEditor />
        </div>

    </div>
  )
}
