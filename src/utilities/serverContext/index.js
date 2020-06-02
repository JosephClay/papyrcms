import useSettings from './useSettings'
import database from './database'
import authorization from './authorization'


export default async (req, res) => {

  const db = await database()
  const user = await authorization(req, db)
  const settings = await useSettings(db)

  return { user, settings, db }
}
