import React from 'react'
import CheckoutForm from '../../_componets/CheckoutForm/CheckoutForm'

export default async function Checkout({params}:{params:{cartId:string}}) {
  const {cartId} = await params
  return (
    <div>
        <CheckoutForm cartId={cartId}></CheckoutForm>
    </div>
  )
}
