import React, { useState } from 'react'
import { login } from "../services/authService/authService"
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'username') {
      setUsername(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await login(username, password)
      if (result?.data?.token) {
        localStorage.setItem('token', result?.data?.token)
        localStorage.setItem('user', JSON.stringify(result?.data?.user))
        navigate('/dashboard')
      }
      setUsername('')
      setPassword('')
    } catch (error: any) {
      setError(error?.response?.data?.message || error.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleLogin} className='form-item'>
        <h1>Login</h1>
        <input value={username} onChange={handleChange} name='username' type="text" placeholder='Username' />
        <input value={password} onChange={handleChange} name='password' type="password" placeholder='Password' />
        <button disabled={loading} type='submit'>Login</button>
        {error && <p className='error'>{error}</p>}
        <a href="">Forgot Your Password?</a>
      </form>
    </div>
  )
}
