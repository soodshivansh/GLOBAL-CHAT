import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import {Toaster , toast} from 'react-hot-toast';
import { useParams } from 'react-router-dom';


function ChatPage() {

    const msgform = useRef();
    const messagesContainerRef = useRef();
    const [text, setText] = useState("");
    const [data, setData] = useState([]);
    const [owner, setOwner] = useState("");

    const { name } = useParams();


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
            toast.error("Empty Message !")
            return;
        }

        let form = new FormData(msgform.current);
        let formData = {};

        for (let [key, value] of form.entries()) {
        formData[key] = value;
        }
        formData["owner"] = name;

        await userAuthThroughServer(formData);

        setText("");
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight; // Scroll to the bottom of the container
    };

    const fetchData = async () => {
        try {
          const response = await axios.get('https://global-chat-backend.onrender.com/getmessages');
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        
    };

    const updateData = () => {
        fetchData();
    };

    useEffect(() => {
        updateData(); // Initial call
        setOwner(name);
    
        const intervalId = setInterval(() => {
          updateData(); // Call the function every 2 seconds
        }, 2000);
    
        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
      }, []);


    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
      
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
      
        return color;
      }

  return (
    <>
        <div className="flex flex-col gap-10 h-screen items-center justify-center">
            <div className='flex p-5 w-full max-w-[80vh] justify-between'>
                <h1 className='text-2xl font-semibold text-white'>GLOBAL - CHAT</h1>
                <NavLink to="/"><p className='text-2xl font-semibold text-white border-b border-white flex justify-center'>Home</p></NavLink>
            </div>
            <Toaster />

            <div className='flex flex-col bg-gray-400 h-[70vh] w-full max-w-[80vh] p-5 items-center justify-end gap-5'>
                <div ref={messagesContainerRef} className='w-full flex flex-col gap-2 overflow-y-scroll'>
                    {data.map((item, index) => (
                        <div className={`w-full flex ${owner === item.owner ? 'justify-end' : 'justify-start'}`}>
                        <div key={index} className='bg-white rounded-xl md:w-[40vh] w-[30vh] p-2 flex flex-col items-center justify-center'>
                            <div className={`flex justify-start w-full uppercase`}>
                                {item.owner}
                            </div>
                            <div>
                                {item.text}
                            </div>
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
                    className='w-full h-12 flex p-5 rounded-l-xl'
                />
                <button type='submit' className='h-12 w-full max-w-24 rounded-r-xl bg-green-200 hover:bg-green-950 hover:text-white'>
                    SEND
                </button>
                </form>
            </div>
        </div>
    </>
  );
}

export default ChatPage;