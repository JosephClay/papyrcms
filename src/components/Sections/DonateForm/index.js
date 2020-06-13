import React, { useState, useContext } from 'react'
import axios from 'axios'
import userContext from '@/context/userContext'
import CreditCardForm from '@/components/CreditCardForm'
import Input from '@/components/Input'
import styles from './style.module.scss'


const DonateForm = (props) => {

  const { currentUser } = useContext(userContext)
  const { className } = props
  const [email, setEmail] = useState(currentUser ? currentUser.email : '')
  const [amount, setAmount] = useState(1.00)
  const [paid, setPaid] = useState(false)


  const handleSubmit = (source, setProcessing, setValidation) => {

    switch (true) {

      case amount < 1:
        setValidation('You must donate at least 1 dollar.')
        setProcessing(false)
        return

      case email === '':
        setValidation('Please enter your email.')
        setProcessing(false)
        return

      default:
        const donationData = {
          source,
          amount,
          email,
        }

        axios.post('/api/utility/donate', donationData)
          .then(response => {
            if (response.data.status === 'succeeded') {
              setPaid(true)
            }
          })
          .catch(error => {
            console.error(error)
            setValidation('Something went wrong. Please try again later.')
            setProcessing(false)
          })
    }
  }

  if (paid) {
    return (
      <div className={`${styles['donate-form']} ${className}`}>
        <div className={styles["donate-form__thanks"]}>
          <h3 className="heading-tertiary">Thank you for your donation!</h3>
          <p>You will recieve a reciept of your donation via the email you submitted shortly.</p>
        </div>
      </div>
    )
  }

  return (
    <section className={`${styles['donate-form']} ${className}`}>
      <form className={styles["donate-form__form"]}>
        <div className="u-form-row">
          <Input
            id="donation_email"
            label="Email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <Input
            id="donation_amount"
            label="Amount"
            type="number"
            required
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>

        <CreditCardForm onSubmit={handleSubmit} />
      </form>
    </section>
  )
}


export const options = {
  DonateForm: {
    file: 'DonateForm',
    name: 'Donate Form',
    description: 'This is a simple donation form where people can donate money to you.',
    inputs: ['className'],
    maxPosts: null,
    defaultProps: {}
  }
}


export default DonateForm