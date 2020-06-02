import serverContext from '@/serverContext'


const getProduct = async (id) => {
  let product
  try {
    product = await Product.findById(id)
      .populate('comments')
      .populate({ path: 'comments', populate: { path: 'author' } })
      .lean()
  } catch (err) {}

  if (!product) {
    product = await Product.findOne({ slug: id })
      .populate('comments')
      .populate({ path: 'comments', populate: { path: 'author' } })
      .lean()
  }

  return product
}


const updateProduct = async (id, body) => {
  body.slug = body.title.replace(/\s+/g, '-').toLowerCase()
  await Product.findOneAndUpdate({ _id: id }, body)

  return await Product.findOne({ _id: id }).lean()
}


const deleteProduct = async (id) => {
  await Product.findByIdAndDelete(id)
  return 'product deleted'
}


export default async (req, res) => {

  const { user, settings, db } = await serverContext(req, res)
  if ((!user || !user.isAdmin) && !settings.enableStore) {
    return res.status(403).send({ message: "You are not allowed to do that." })
  }

  if (req.method === 'GET') {
    const product = await getProduct(req.query.id, db)
    if ((!product || !product.published) && (!user || !user.isAdmin)) {
      return res.status(403).send({ message: 'You are not allowed to do that.' })
    }
    return res.status(200).send(product)
  }


  if (req.method === 'PUT') {
    if (!user || !user.isAdmin) {
      return res.status(403).send({ message: 'You are not allowed to do that.' })
    }
    const product = await updateProduct(req.query.id, req.body, db)
    return res.status(200).send(product)
  }


  if (req.method === 'DELETE') {
    if (!user || !user.isAdmin) {
      return res.status(403).send({ message: 'You are not allowed to do that.' })
    }
    const message = await deleteProduct(req.query.id, db)
    return res.status(200).send(message)
  }

  return res.status(404).send({ message: 'Page not found.' })
}
