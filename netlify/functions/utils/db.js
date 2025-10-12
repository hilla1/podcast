import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const uri = process.env.MONGODB_URI
let cachedClient = null
let cachedDb = null

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db('podcastblog')

  cachedClient = client
  cachedDb = db

  // Initialize collections and seed data
  await initializeDatabase(db)

  return { client, db }
}

async function initializeDatabase(db) {
  const collections = await db.listCollections().toArray()
  const collectionNames = collections.map(c => c.name)

  // Create users collection and seed data if it doesn't exist
  if (!collectionNames.includes('users')) {
    await db.createCollection('users')
    await db.collection('users').insertMany([
      { _id: uuidv4(), username: 'admin', password: 'admin', role: 'admin', premium: false },
      { _id: uuidv4(), username: 'writer', password: 'writer', role: 'writer', premium: false },
    ])
  }

  // Create blogs collection and seed data if it doesn't exist
  if (!collectionNames.includes('blogs')) {
    await db.createCollection('blogs')
    await db.collection('blogs').insertOne({
      _id: uuidv4(),
      title: 'Sample Tech Blog',
      description: 'Latest in tech',
      content: 'Full content here... long text for audio. '.repeat(100),
      image: 'https://via.placeholder.com/800x400',
      author: 'writer',
      slug: 'sample-tech-blog',
      category: 'tech',
      status: 'approved',
      premium: false,
      views: 10,
      comments: [],
    })
  }
}

async function find(collectionName, query = {}, options = {}) {
  const { db } = await connectToDatabase()
  return db.collection(collectionName).find(query, options).toArray()
}

async function findOne(collectionName, query, options = {}) {
  const { db } = await connectToDatabase()
  return db.collection(collectionName).findOne(query, options)
}

async function insertOne(collectionName, doc) {
  const { db } = await connectToDatabase()
  return db.collection(collectionName).insertOne(doc)
}

async function updateOne(collectionName, filter, update, options = {}) {
  const { db } = await connectToDatabase()
  return db.collection(collectionName).updateOne(filter, update, options)
}

export { find, findOne, insertOne, updateOne, connectToDatabase }