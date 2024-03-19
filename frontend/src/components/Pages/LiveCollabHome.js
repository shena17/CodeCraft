import React, { useState } from 'react'
import logo from "../../images/logo.png";
import "../../styles/liveHome.css"
import { colors } from '@mui/material';
import {v4 as uuidV4} from 'uuid';  
import toast from 'react-hot-toast';

export default function LiveCollabHome() {

  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState();

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success('Created a new room');
  }

  return (
    <div className='livehomepageWrapper'>

      <div className='formWrapper'>

      <center>
      <div className='liveimage-Container'>
            <img src={logo} alt="codecraftlogo" className="livehomeLogo"/>
        </div>
      </center>

      <center>
      <hr style={{ color: 'black', fontWeight: 'bold' }} />
      <h4 className='mainLabel'> Paste invitation ROOM ID</h4>
      </center>
        
        <div className='inputGroup'>
              <input 
                  type="text" 
                  className='inputBox' 
                  placeholder='ROOM ID'
                  onChange={(e) => setRoomId(e.target.value)}
                  value={roomId}
              />

              <input 
                  type="text" 
                  className='inputBox' 
                  placeholder='USERNAME'
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
              />

         <button className='btn joinBtn'>Join</button>

         <span className='createInfo'>
              If you don't have an invite then create &nbsp;
              <a onClick={createNewRoom} href="" className='createNewBtn'> 
                  new ROOM
              </a>
          </span>

        </div>

      </div>


    </div>
  )
}
