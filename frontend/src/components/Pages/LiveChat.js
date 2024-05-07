import React, { useEffect, useState, useRef } from 'react'
import logo from '../../images/logo.png';
import "../../styles/liveChat.css";
import { initSocket } from '../../socket';

export default function LiveChat() {

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        const connectToSocket = async () => {
            try {
                const socket = await initSocket(); // Initialize socket connection
                socketRef.current = socket; // Set the socket reference

                const userName = prompt('Please enter your name:');
                setName(userName);
                
                socketRef.current.on('message', (msg) => {
                    setMessages(prevMessages => [...prevMessages, msg]);
                    scrollToBottom();
                });

                socketRef.current.on('connect_error', (error) => {
                    console.error('Socket connection error:', error);
                });

                console.log('Socket connected successfully');
            } catch (error) {
                console.error('Socket connection error:', error);
            }
        };

        connectToSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            const msg = {
                user: name,
                message: message.trim(),
            };
            socketRef.current.emit('message', msg); // Access socket using the ref
            setMessage('');
        }
    };

    const scrollToBottom = () => {
        const messageArea = document.querySelector('.chat_message_area');
        messageArea.scrollTop = messageArea.scrollHeight;
    };



    return (
        <div className="live_chat_main_wrap">
            <section className="chat_body">
                <div className="chat_section">
                    <div className="chat_brand">
                        <img src={logo} alt="" style={{ width: '100px', height: 'auto' }} />
                    </div>
                    <div className="chat_message_area">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.user === 'You' ? 'chat_outgoing_message' : 'chat_incoming_message'}>
                                <h4>{msg.user}</h4>
                                <p>{msg.message}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <textarea id="chat_textarea" cols={30} rows={1} placeholder="Write a message" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()}></textarea>
                        <button id="send_button" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
