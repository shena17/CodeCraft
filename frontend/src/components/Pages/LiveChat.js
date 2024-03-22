import React from 'react'
import logo from '../../images/logo.png';
import "../../styles/liveChat.css"

export default function LiveChat() {
  return (

    <div className='live_chat_main_wrap'>
        <div className='chat_section'>

<div className='chat_brand'>
    <img src={logo} alt="" style={{ width: '100px', height: 'auto' }} />
</div>


<div className='chat_message_area'>
    <div className='chat_incoming_message'>
        <h4>Thanuka</h4>
        <p>Hello</p>
    </div>
</div>

<div className='chat_message_area'>
    <div className='chat_outgoing_message'>
        <h4>Thanuka</h4>
        <p>Hello</p>
    </div>
</div>

</div>
    </div>
  )
}
