import React, { useEffect, useState } from 'react'
import logo from '../../images/logo.png';
import "../../styles/liveChat.css";
import {io} from 'socket.io-client'

export default function LiveChat() {
        

  return (

    <div className='live_chat_main_wrap'>

        <section className='chat_body'>

            <div className='chat_section'>

                <div className='chat_brand'>
                    <img src={logo} alt="" style={{ width: '100px', height: 'auto' }} />
                </div>


                <div className='chat_message_area'>
                    <div className='chat_incoming_message'>
                        <h4>Thanuka</h4>
                        <p>Hello! How are you?</p>
                    </div>
                </div>

                <div className='chat_message_area'>
                    <div className='chat_outgoing_message'>
                        <h4>Minik</h4>
                        <p>I'm fine. Thank you</p>
                    </div>
                </div>
               
                <div>
                    <textarea id="chat_textarea"cols={30} rows={1} placeholder='Write a message' ></textarea>
                </div>

            </div>
        </section>

    </div>
  )
}
