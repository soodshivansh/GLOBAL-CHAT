import axios from 'axios';
import './App.css';
import React, { useEffect, useRef, useState } from 'react';
// const BASE_URL = process.env.BASE_URL;

function App() {
  const msgform = useRef();
  const messagesContainerRef = useRef();
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const userAuthThroughServer = async (formData) => {
    try {
      const response = await axios.post(`https://global-chat-backend.onrender.com/sendmessages`, formData);
      const newMessage = response.data; // Assuming the server returns the new message

      // Update the local state with the new message
      setData(prevData => [...prevData, newMessage]);

      console.log("Message sent successfully:", newMessage);
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data.error : error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Checking if the msg is empty
    if (!text.trim()) {
      return;
    }

    let form = new FormData(msgform.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { content } = formData;
    console.log(content);

    await userAuthThroughServer(formData);

    setText("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://global-chat-backend.onrender.com/getmessages`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the container
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [data]);

  return (
    <div className="flex flex-col gap-10 h-screen items-center justify-center">
      <h1 className='text-2xl font-semibold text-white'>GLOBAL - CHAT</h1>

      <div className='flex flex-col bg-gray-400 h-[70vh] w-full max-w-[80vh] p-5 items-center justify-end gap-5'>
        <div ref={messagesContainerRef} className='w-full flex flex-col gap-2 overflow-y-hidden'>
            {data.map((item, index) => (
                <div className='w-full flex justify-start'>
                  <div key={index} className='bg-white rounded-xl w-[40vh] p-2 flex items-center justify-center'>
                    {item.text}
                  </div>
                </div>
            ))}
        </div>

        <form ref={msgform} onSubmit={handleSubmit} className='flex sticky w-full'>
          <input
            type='text'
            name='content'
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='w-full h-12 flex p-5'
          />
          <button type='submit' className='h-12 w-full max-w-24 bg-green-200 hover:bg-green-950 hover:text-white'>
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
