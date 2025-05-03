import React from 'react'

export default function Signup() {
  return (
    <div className='form-container'>
        <form className='form-item'>
            <h1>Sign Up</h1>
            <input type="text" placeholder='Username' />
            <input type="text" placeholder='Email' />
            <input type="password" placeholder='Password' />
            <button>Signup</button>
        </form>
    </div>
  )
}
