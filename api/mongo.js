import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:37017')

export default client
