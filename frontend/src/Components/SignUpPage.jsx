import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {Toaster , toast} from 'react-hot-toast';
import axios from 'axios';

function SignUpPage() {

  const authform = useRef();

  const userAuthThroughServer = (formData) => {

    axios.post(`https://global-chat-backend.onrender.com/signup`, formData)
    .then(({ data }) => {
        console.log(data);
        toast.success("User created")
    })
    .catch(({ response }) => {
        toast.error(response.data.error)
    })

  }

  const handlesubmit = (e) => {
    e.preventDefault();

    let form = new FormData(authform.current);

    let formData = {};

    for(let [key,value] of form.entries()){
        formData[key] = value ;
    }

    userAuthThroughServer(formData);

  }

  return (
    <>
        <div className='h-screen flex flex-col items-center justify-center'>
        <Toaster />
            <section>
              <div className=" bg-transparent relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
                <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
                  <div className="flex flex-col">
                    <div>
                      <h2 className="text-4xl text-white">Sign Up</h2>
                    </div>
                  </div>
                  <form ref={authform}>
                    {/* <input value="https://jamstacker.studio/thankyou" type="hidden" name="_redirect" /> */}
                    <div className="mt-4 space-y-6">
                      <div className="col-span-full">
                        <label className="block mb-3 text-sm font-medium text-gray-600"> Name   </label>
                        <input type="text" name='name' className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                      </div>
                      <div className="col-span-full">
                        <label className="block mb-3 text-sm font-medium text-gray-600"> Passord   </label>
                        <input type="text" name='password' className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                      </div>

                      <div className="col-span-full">
                        <button type="submit" onClick={handlesubmit} className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 border-2 border-white rounded-full nline-flex hover:scale-[110%] focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"> Submit   </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
            <NavLink to="/signin"><p className='text-xl text-white border-b'>Or Sign In</p></NavLink>
        </div>
    </>
  );
}

export default SignUpPage;