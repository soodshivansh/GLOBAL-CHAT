import './App.css';
import React from 'react';
import ChatPage from './Components/ChatPage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import SignInPage from './Components/SignInPage';
import SignUpPage from './Components/SignUpPage';

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>

          <Route index path='/' element={<Home />} />
          <Route path="/chat-page/:name" element={<ChatPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/signup' element={<SignUpPage />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
