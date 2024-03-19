import React from 'react'
import logo from "../../images/logo.png";
import "../../styles/liveHome.css"
import { colors } from '@mui/material';

export default function LiveCollabHome() {
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
              />

              <input 
                  type="text" 
                  className='inputBox' 
                  placeholder='USERNAME'
              />

         <button className='btn joinBtn'>Join</button>

         <span className='createInfo'>
              If you don't have an invite then create &nbsp;
              <a href="" className='createNewBtn'> 
                  new ROOM
              </a>
          </span>

        </div>

      </div>


    </div>
  )
}
