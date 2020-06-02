import serverContext from "@/serverContext"

export default async (req, res) => {

  const { user, db } = await serverContext(req, res)
  if (!user || !user.isAdmin) {
    return res.status(403).send({ message: "You are not allowed to do that." })
  }

  if (req.method === 'PUT') {
    const { userId, isBanned } = req.body

    await db.collection('users').findAndModify({ _id, userId }, [], { isBanned })
    return res.status(200).send({ message: 'Success' })
  }

  return res.status(404).send({ message: 'Page not found' })
}
