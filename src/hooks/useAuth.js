import { useState } from 'react'
import axios from 'axios'

export const useAuth = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [token, setToken] = useState(localStorage.getItem('token'))

  const updateAuth = (newToken, newUser) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
    axios.defaults.headers.common['Authorization'] = newToken ? `Bearer ${newToken}` : ''
  }

  const login = async (credentials) => {
    const res = await axios.post('/api/auth/login', credentials)
    updateAuth(res.data.token, res.data.user)
  }

  const signup = async (data) => {
    const res = await axios.post('/api/auth/signup', data)
    updateAuth(res.data.token, res.data.user)
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
    axios.defaults.headers.common['Authorization'] = ''
  }

  return { user, login, signup, logout }
}