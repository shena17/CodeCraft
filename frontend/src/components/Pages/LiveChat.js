import React, { useEffect, useState } from 'react'
import logo from '../../images/logo.png';
import "../../styles/liveChat.css";
import io from 'socket.io-client'

export default function LiveChat() {
    useEffect(() => {
        const socket = io('http://localhost:8071'); // Initialize socket connection

        let name;
        do {
            name = prompt('Please enter your name: ');
        } while (!name);

        const messageArea = document.querySelector('.chat_message_area');
        const sendButton = document.querySelector('#send_button');
        
        const sendMessage = (message) => {
            const msg = {
              user: name,
              message: message,
            };
            socket.emit('message', msg);
          };

          const appendMessage = (msg, isOutgoing) => {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = `${msg.user}: ${msg.message}`;
            messageDiv.className = isOutgoing ? 'chat_outgoing_message' : 'chat_incoming_message';
            messageArea.appendChild(messageDiv);
            scrollToBottom();
        };

        socket.on('message', (msg) => {
            appendMessage(msg, false);
        });
       
         sendButton.addEventListener('click', () => { // Add event listener to send button
            const textarea = document.querySelector('#chat_textarea');
            const message = textarea.value.trim();
            if (message) {
                sendMessage(message);
                appendMessage({ user: 'You', message }, true); // Display outgoing message
                textarea.value = ''; // Clear textarea after sending message
            }
        });

          function scrollToBottom() {
            messageArea.scrollTop = messageArea.scrollHeight;
          }
      
          return () => {
            socket.disconnect();
          };
        }, []);


    return (
        <div className='live_chat_main_wrap'>
        <section className='chat_body'>
            <div className='chat_section'>
                <div className='chat_brand'>
                    <img src={logo} alt="" style={{ width: '100px', height: 'auto' }} />
                </div>
                <div className='chat_message_area'></div>
                <div>
                    <textarea id="chat_textarea" cols={30} rows={1} placeholder='Write a message'></textarea>
                    <button id="send_button">Send</button> {/* New: Send button */}
                </div>
            </div>
        </section>
    </div>
    );
}
