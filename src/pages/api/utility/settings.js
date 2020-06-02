import serverContext from '@/serverContext'


export default async (req, res) => {

  const { user, settings, db } = await serverContext(req, res)

  if (req.method === 'GET') {
    return res.status(200).send(settings)
  }


  if (req.method === 'POST') {
    if (!user || !user.isAdmin) {
      return res.status(403).send({ message: 'You are not allowed to do that.' })
    }

    const settings = await db.collection('settings').find()

    for (const setting of settings) {
      for (const key in req.body) {
        if (typeof setting.options[key] !== 'undefined') {
          setting.options[key] = req.body[key]
          await db.collection('settings').findAndModify({ _id: settings._id }, [], setting)
        }
      }
    }

    return res.status(200).send(req.body)
  }

  return res.status(404).send({ message: 'Page not found.' })
}
