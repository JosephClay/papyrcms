import serverContext from "@/serverContext"


export default async (req, res) => {

  const { user, db } = await serverContext(req, res)
  if (!user || !user.isAdmin) {
    return res.status(403).send({ message: "You are not allowed to do that." })
  }

  if (req.method === 'GET') {

    const orders = await db.collection('orders').find({}, { sort: { created: -1 }})
    for (const order of orders) {
      order.user = await db.collection('users').findOne({ _id: order.user })
      order.products = _.map(order.products, _id => db.collection('products').findOne({ _id }))
    }

    return res.status(200).send(orders)
  }

  return res.status(404).send({ message: 'Page not found.' })
}
