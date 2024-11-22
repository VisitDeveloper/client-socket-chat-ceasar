import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { caesarDecrypt } from '../lib/caesarCode';
import Cryptanalyst from './cryptanalysis';
import {REACT_APP_BASE_URL , REACT_APP_KEY_ENCRYPTION} from './../constant/baseurl'

const socket = io(REACT_APP_BASE_URL); // Connect to the server

const Chat = () => {
  const [message, setMessage] = useState('');
  const [shift] = useState(Number(REACT_APP_KEY_ENCRYPTION)); // Set a default shift for Caesar cipher
  const [messages, setMessages] = useState([]);
  const [currentDecryption , setCurrentDecryption] = useState('')
  
  
  // encryption
  const caesarEncrypt = (text, shift) => {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt();
        const base = char >= 'a' ? 97 : 65; 
        return String.fromCharCode(((code - base + shift) % 26) + base);
      }
      return char;
    }).join('');
  };

  useEffect(() => {
    socket.on('receiveMessage', (encryptedMessage) => {
      const decryptedMessage = caesarDecrypt(encryptedMessage, shift);
      console.log('decrrrr' , decryptedMessage)
      setCurrentDecryption(decryptedMessage)
      setMessages((prevMessages) => [...prevMessages, decryptedMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const encryptedMessage = caesarEncrypt(message, shift);
      socket.emit('sendMessage', { message: encryptedMessage, shift }); // Send message and shift
      setMessage('');
    }
  };



  return (
    <div>
      <h1>Socket.IO Chat with Caesar Cipher</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      {/* <input
        type="number"
        value={shift}
        onChange={(e) => setShift(parseInt(e.target.value))}
        placeholder="Enter shift..."
      /> */}
      <button onClick={sendMessage}>Send</button>
      <h2>Messages:</h2>
      <ul>
        
        {messages?.length !==0 && messages.map((msg, index) => (
          <li key={index}>{msg}</li> // Ensure that `msg` is a string
        ))}
      </ul>

      <Cryptanalyst decrypt={currentDecryption}/>
    </div>
  );
};

export default Chat;
