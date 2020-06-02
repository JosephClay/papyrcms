// import mongoose from 'mongoose'
import { MongoClient } from 'mongodb'
import keys from '@/keys'

export default async () => {
  
  const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  const client = new MongoClient(keys.mongoURI, config)
  
  if (!client.isConnected()) await client.connect();

  const db = client.db(client.s.options.dbName)

  return db
}
