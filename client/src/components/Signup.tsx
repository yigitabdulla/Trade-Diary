import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services/authService/authService'

export default function Signup() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'username') {
      setUsername(value)
    } else if (name === 'password') {
      setPassword(value)
    } else if (name === 'email') {
      setEmail(value)
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await signup(username, email, password)
      if (result?.data?.token) {
        localStorage.setItem('token', result?.data?.token)
        localStorage.setItem('user', JSON.stringify(result?.data?.user))
        navigate('/dashboard')
      }
      setUsername('')
      setPassword('')
    } catch (error: any) {
      setError(error?.response?.data?.message || error.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='form-container'>
        <form onSubmit={handleSignup} className='form-item'>
            <h1>Sign Up</h1>
            <input value={username} onChange={handleChange} name='username' type="text" placeholder='Username' />
            <input value={email} onChange={handleChange} name='email' type="email" placeholder='Email' />
            <input value={password} onChange={handleChange} name='password' type="password" placeholder='Password' />
            <button disabled={loading} type='submit'>Signup</button>
            {error && <p className='error'>{error}</p>}
            <a href="">Forgot Your Password?</a>
        </form>
    </div>
  )
}
