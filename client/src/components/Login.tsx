import React from 'react'

export default function Login() {
  return (
    <div className='form-container'>
        <form className='form-item'>
            <h1>Login</h1>
            <input type="text" placeholder='Username' />
            <input type="password" placeholder='Password' />
            <button>Login</button>
            <a href="">Forgot Your Password?</a>
        </form>
    </div>
  )
}
