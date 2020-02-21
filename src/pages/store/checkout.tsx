import React, { useState, useContext } from 'react';
import axios from 'axios'
import keys from '../../config/keys'
import storeContext from '../../context/storeContext'
import CreditCardForm from '../../components/CreditCardForm'
import Input from '../../components/Input'
import UserInfoForm from '../../components/UserInfoForm'


const Checkout = props => {

  const cartState = useContext(storeContext)

  let cart = []
  let fromCart = false

  // Get the checkout item(s)
  if (props.product) {
    cart = [props.product]
  } else {
    cart = cartState.cart
    fromCart = true
  }

  const [orderNotes, setOrderNotes] = useState("")
  const [handleSubmitSuccess, setHandleSubmitSuccess] = useState(() => null)
  const [handleSubmitError, setHandleSubmitError] = useState(() => null)

  const handleCardSubmit = (source, setProcessing, setValidation) => {
    const errorFunction = () => {
      setProcessing(false)
      setValidation('Something went wrong.')
    }
    setHandleSubmitError(() => errorFunction)


    const successFunction = formState => {
      const additionalValues = {
        fromCart,
        source,
        notes: orderNotes,
        products: cart
      }

      const success = () => {
        setProcessing(false)
        setValidation('Your order has been sent!')
        if (fromCart) {
          cartState.clearCart()
        }
      }

      const error = err => {
        setProcessing(false)
        if (err.response) {
          setValidation(err.response.data.message)
        }
      }

      formState.submitForm(
        '/api/store/checkout',
        { success, error },
        false,
        additionalValues
      )
    }
    setHandleSubmitSuccess(() => successFunction)

    document.getElementById('userInfoForm').dispatchEvent(new Event('submit'))
  }

  const renderProductsList = () => {
    return cart.map((product, i) => {
      return <p key={product._id + i.toString()}>{product.title}: ${product.price.toFixed(2)}</p>
    })
  }

  const renderTotalCost = () => {
    let totalCost = 0
    cart.forEach(product => totalCost += product.price)
    return <p className="u-margin-bottom-small">Total Cost: ${totalCost.toFixed(2)}</p>
  }

  return (
    <section className="checkout">
      <div className="checkout__container">

        <h2 className="heading-secondary">Checkout</h2>

        <UserInfoForm
          useSubmit={false}
          onSubmitSuccess={handleSubmitSuccess}
          onSubmitError={handleSubmitError}
        >
          <Input
            type="textarea"
            label="Additional notes about the order"
            name="orderNotes"
            value={orderNotes}
            onChange={event => setOrderNotes(event.target.value)}
          />

          {renderProductsList()}
          <hr />
          {renderTotalCost()}

          <CreditCardForm onSubmit={handleCardSubmit} />
        </UserInfoForm>

      </div>
    </section>
  )
}


Checkout.getInitialProps = async ({ query }) => {

  const rootUrl = keys.rootURL ? keys.rootURL : ''

  let product
  if (query.id) {
    const res = await axios.get(`${rootUrl}/api/store/products/${query.id}`)
    product = res.data
  }

  return { product }
}


export default Checkout
