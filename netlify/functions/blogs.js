import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { find, findOne, insertOne, updateOne } from './utils/db.js'

const secret = process.env.JWT_SECRET || 'secretkey'

function authenticate(authHeader) {
  if (!authHeader) return null
  const token = authHeader.split(' ')[1]
  try {
    return jwt.verify(token, secret)
  } catch {
    return null
  }
}

export async function handler(event) {
  try {
    const user = authenticate(event.headers.authorization)
    const pathParts = event.path.split('/api/blogs/')
    const subPath = pathParts[1] || ''
    const httpMethod = event.httpMethod

    if (httpMethod === 'GET' && subPath === '') {
      if (!user) return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) }
      const blogs = await find('blogs')
      return { statusCode: 200, body: JSON.stringify(blogs) }
    }

    if (httpMethod === 'GET' && subPath === 'pending') {
      if (!user || user.role !== 'admin') return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden' }) }
      const pending = await find('blogs', { status: 'pending' })
      return { statusCode: 200, body: JSON.stringify(pending) }
    }

    if (httpMethod === 'GET' && subPath.includes('/')) {
      const [author, slug] = subPath.split('/')
      const blog = await findOne('blogs', { author, slug })
      if (!blog) return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) }
      return { statusCode: 200, body: JSON.stringify(blog) }
    }

    if (httpMethod === 'POST' && subPath === '') {
      if (!user || !['writer', 'admin'].includes(user.role)) return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden' }) }
      const body = JSON.parse(event.body)
      const newBlog = { ...body, _id: uuidv4(), views: 0, comments: [], status: 'pending' }
      await insertOne('blogs', newBlog)
      return { statusCode: 200, body: JSON.stringify(newBlog) }
    }

    if (httpMethod === 'POST' && subPath.startsWith('view/')) {
      const id = subPath.replace('view/', '')
      await updateOne('blogs', { _id: id }, { $inc: { views: 1 } })
      return { statusCode: 200, body: '' }
    }

    if (httpMethod === 'POST' && subPath.startsWith('approve/')) {
      if (!user || user.role !== 'admin') return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden' }) }
      const id = subPath.replace('approve/', '')
      const result = await updateOne('blogs', { _id: id }, { $set: { status: 'approved' } })
      if (result.matchedCount === 0) return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) }
      return { statusCode: 200, body: JSON.stringify({ success: true }) }
    }

    if (httpMethod === 'POST' && subPath.endsWith('/comment')) {
      if (!user) return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) }
      const id = subPath.replace('/comment', '')
      const { text } = JSON.parse(event.body)
      await updateOne('blogs', { _id: id }, { $push: { comments: { user: user.username, text } } })
      const updated = await findOne('blogs', { _id: id })
      return { statusCode: 200, body: JSON.stringify(updated) }
    }

    return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) }
  } catch (err) {
    console.error(err)
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) }
  }
}