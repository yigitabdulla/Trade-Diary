import React, { useState } from 'react'
import Login from '../components/Login';
import Signup from '../components/Signup';
import "../styles/auth.scss"

export default function Auth() {

  const [selectedTab, setSelectedTab] = useState('login');

  const handleSelectedTab = (tab: string) => {
    setSelectedTab(tab);
  }

  return (
    <div className='auth-container'>
        <div className='auth-wrapper'>
          <div className='auth-tabs'>
            <div onClick={() => handleSelectedTab('login')} className={selectedTab === 'login' ? 'active' : ''}>Login</div>
            <div onClick={() => handleSelectedTab('signup')} className={selectedTab === 'signup' ? 'active' : ''}>Signup</div>
          </div>
          {selectedTab === 'login' ? <Login /> : <Signup />}
        </div>
      <img src="forex.png" alt="" />
    </div>
  )
}
