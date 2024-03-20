import React, { useState, useRef, useEffect } from 'react';
import Client from '../LiveCollab/Client';
import LiveEditor from '../LiveCollab/LiveEditor';
import "../../styles/liveEditor.css"
import "../../styles/liveHome.css"
import { initSocket } from '../../socket';
import ACTIONS from '../../Actions';
import {useLocation} from 'react-router-dom';

export default function LiveCollabEditorPage() {

  const socketRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
     // socketRef.current.emit(ACTIONS.JOIN, {
       // roomId,
        //username: location.state?.username,

      //});
    }
  },[])

  const [clients, setClients] = useState([
    {socketId: 1, username: 'Thanuka'},
    {socketId: 2, username: 'Sithmi'},
    {socketId: 3, username: 'Minik'},
  ]);
    

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
        <button className='btn copyBtn'>Copy ROOM ID</button>
        <button className='btn leaveBtn'>Leave</button>

      </div>

      <div className='liveeditorWrap'>
          <LiveEditor />
        </div>

    </div>
  )
}
