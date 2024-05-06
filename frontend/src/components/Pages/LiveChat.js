import React, { useEffect, useState } from 'react'
import logo from '../../images/logo.png';
import "../../styles/liveChat.css";
import {io} from 'socket.io-client'

export default function LiveChat() {
    useEffect(() => {
        const socket = io(); // Initialize socket connection

        let name;
        do {
            name = prompt('Please enter your name: ');
        } while (!name);

        const textarea = document.querySelector('#chat_textarea');
        const messageArea = document.querySelector('.message__area');
        const sendButton = document.querySelector('#send_button');

        textarea.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                sendMessage(e.target.value);
            }
        });

        sendButton.addEventListener('click', () => { // Event listener for send button
            const message = textarea.value.trim();
            if (message) {
                sendMessage(message);
            }
        });

        function sendMessage(message) {
            let msg = {
                user: name,
                message: message
            };
            socket.emit('message', msg);
        }

        socket.on('message', (msg) => {
            appendMessage(msg);
            scrollToBottom();
        });

        function appendMessage(msg) {
            let messageDiv = document.createElement('div');
            messageDiv.textContent = `${msg.user}: ${msg.message}`;
            messageArea.appendChild(messageDiv);
        }

        function scrollToBottom() {
            messageArea.scrollTop = messageArea.scrollHeight;
        }

        return () => {
            socket.disconnect(); // Clean up socket connection on component unmount
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
