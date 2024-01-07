import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {

  return (
    <>
        <div className='flex justify-center items-center h-screen flex-col gap-10'>
            <h1 className='text-3xl text-white'>Welcome to Global Chat</h1>
            <NavLink to="/signin"><button className='p-5 h-20 w-44 border border-white hover:scale-[110%] text-xl text-white rounded-xl'>Get Started</button></NavLink>
        </div>
    </>
  );
}

export default Home;