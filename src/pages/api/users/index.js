import serverContext from "@/serverContext"


export default async (req, res) => {

  const { user, db } = await serverContext(req, res)
  if (!user || !user.isAdmin) {
    return res.status(403).send({ message: "You are not allowed to do that." })
  }

  if (req.method === 'GET') {
    const users = await db.collection('users').find()
    return res.status(200).send(users)
  }

  return res.status(404).send({ message: 'Page not found.' })
}