import jwt from 'jsonwebtoken'
import keys from '@/keys'


export default async (req, db) => {

  if (req.headers.authorization && req.headers.authorization.includes('bearer ')) {
    const token = req.headers.authorization.replace('bearer ', '')

    try {
      const tokenObject = jwt.verify(token, keys.jwtSecret)
      const { uid } = tokenObject
      if (uid) {
        return await db.collection('users').findOne({ _id: uid, isBanned: false })
      }
    } catch (err) {}
  }

  return null
}
