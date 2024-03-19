import React, { useState } from 'react';
import logo from "../../images/logo.png";
import Client from '../LiveCollab/Client';
import "../../styles/liveEditor.css"

export default function LiveCollabEditorPage() {

  const [clients, setClients] = useState([
    {socketId: 1, username: 'Thanuka'},
    {socketId: 1, username: 'Sithmi'},
  ]);
    

  return (
    <div className='livemainWrap'>

      <div className='aside'>
        <div className='asideInner'>
          <div className='liveLogo'>

            <div className='liveimage-Container'>
                <img className="livelogoImage"
                    src={logo} alt="codecraftlogo" 
                />
            </div>

          <h3>Connected</h3>
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

        <button>Copy ROOM ID</button>
        <button>Leave </button>

      </div>

      <div className='liveeditorWrap'>
          Editor is here
        </div>

    </div>
  )
}
