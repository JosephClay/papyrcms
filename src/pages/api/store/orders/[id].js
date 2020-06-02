import serverContext from "@/serverContext"


const updateOrder = async (id, body, db) => {
  return await db.collection('orders').findAndModify({ _id: id }, [], { shipped: body.shipped }, { new: true })
}


const deleteOrder = async (id, db) => {
  await db.collection('orders').findAndRemove({ _id: id }, [])
  return 'order deleted'
}


export default async (req, res) => {

  const { user, db } = await serverContext(req, res)
  if (!user || !user.isAdmin) {
    return res.status(403).send({ message: "You are not allowed to do that." })
  }

  if (req.method === 'PUT') {
    const order = await updateOrder(req.query.id, req.body, db)
    return res.status(200).send(order)
  }


  if (req.method === 'DELETE') {
    const message = await deleteOrder(req.query.id, db)
    return res.status(200).send(message)
  }

  return res.status(404).send({ message: 'Page not found.' })
}
