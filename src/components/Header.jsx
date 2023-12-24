import React, { useState } from "react";
import Logo from './img/logo.png'
import {RiShoppingBasketFill,RiAddFill,RiLogoutBoxFill} from "react-icons/ri";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {motion} from 'framer-motion';
import Avatar from './img/avatar.png';
import { Link, useActionData } from "react-router-dom";
import { app } from "../firebase.config";
import {useStateValue} from"../context/StateProvider";
import {actionType} from"../context/reducer";



const Header= ()=>{
  

  const firebaseAuth=getAuth(app);
  const provider= new GoogleAuthProvider();
  
  const [{user},dispatch] =useStateValue()

  const [isMenu, setisMenu] = useState(false)
  const login =async() =>{
    if(!user)  {

    const {user : {refreshToken, providerData} } = await signInWithPopup(firebaseAuth, provider)
     dispatch({
      type:actionType.SET_USER,
      user: providerData[0],


     })
     localStorage.setItem('user', JSON.stringify(providerData[0]))
    }
    else{
      setisMenu(!isMenu);
    }
  };
  const logout=()=>{
    setisMenu(false)
    localStorage.clear()
    dispatch({
      type:actionType.SET_USER,
      user: null,
    });
  };


  return (
    <header className="fixed z-50 w-screen p-6 px-16">
      {/* desktop tablet*/}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={'/'} className="flex items-center gap-2">
          <img src={Logo} className="w-10 object-cover" alt="logo" />
          <p className="text-headingColor text-x1 font-bold ">City</p>
        </Link>
        <div className="flex items-center justify-center gap-8">
          <ul className="flex items-center gap-8 ">
            <li  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">Home</li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">Menu</li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">About us</li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">Service</li>
          </ul>
          
          <div className="relative flex items-center justify-center">
            <RiShoppingBasketFill className="text-Color text-2xl cursor-pointer" />
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-sm text-white font-semibold">2

              </p>
            </div>
          </div>

          < div className="relative">
          <motion.img 
            whileTap={{scale:0.6}}
            src={user? user.photoURL:Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-x1 cursor-pointer rounded-full"
            alt="userprofile"onClick={login}
            />
            {
              isMenu && (
                <motion.div 
                initial ={{opacity:0, scale:0.6} }
                animate ={{opacity:1, scale:1} }
                exit ={{opacity:0, scale:0.6} }
                className="w-40 bg-gray-50 shadow-x1 rounded-lg flex flex-col absolute top-12 right-0">
              {
                user && user.email==="ritesh.mast@gmail.com" && 
                (
                  <Link to ={"/createItem"}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">new item<RiAddFill/></p>
                    </Link>
                )
              }
                
              
              <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base" onClick={logout}>logout<RiLogoutBoxFill/></p>
              </motion.div>
              )
            }
            </div>
        </div>
      </div>
    </header>
  );
  
}

export default Header