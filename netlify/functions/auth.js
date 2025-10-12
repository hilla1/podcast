import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { findOne, insertOne } from './utils/db.js'

const secret = process.env.JWT_SECRET || 'secretkey'

export async function handler(event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }

  try {
    const body = JSON.parse(event.body)
    const { username, password, premium } = body
    const pathParts = event.path.split('/api/auth/')
    const action = pathParts[1] || ''

    if (action === 'login') {
      const user = await findOne('users', { username, password })
      if (!user) return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials' }) }
      const token = jwt.sign({ id: user._id, username: user.username, role: user.role, premium: user.premium }, secret)
      return { statusCode: 200, body: JSON.stringify({ token, user: { username: user.username, role: user.role, premium: user.premium } }) }
    }

    if (action === 'signup') {
      const existing = await findOne('users', { username })
      if (existing) return { statusCode: 400, body: JSON.stringify({ error: 'Username taken' }) }
      const role = body.role || 'user'
      const newUser = { _id: uuidv4(), username, password, role, premium: !!premium }
      await insertOne('users', newUser)
      const token = jwt.sign({ id: newUser._id, username: newUser.username, role: newUser.role, premium: newUser.premium }, secret)
      return { statusCode: 200, body: JSON.stringify({ token, user: { username: newUser.username, role: newUser.role, premium: newUser.premium } }) }
    }

    return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) }
  } catch (err) {
    console.error(err)
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) }
  }
}