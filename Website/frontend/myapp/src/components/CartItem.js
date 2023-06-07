import React from 'react'
import { useCartContext } from '../hooks/useCartContext'

export default function CartItem({ item }) {

    const { removeItemFromCart } = useCartContext()

    const handleClick = () => {
        removeItemFromCart(item.id)
    }

    return (
        <>

<div className="cart mt-4">
  <div className="row g-0">
    <div className="col-md-2">
      <img src={item.imageURL} alt="Food Image" className="cart-image"/>
    </div>
    <div className="col-md-10">
      <div className="cart-body">
        <h5 className="cart-title">{item.name}</h5>
        <p className="cart-text">{item.variant}</p>
        <p className="cart-text">Price Rs. {item.price}</p>
        <p className="cart-text">Variant: {item.category}</p>
        <p className="cart-text">{item.restaurant}</p>
        <button className="btn btn-danger delete-button" onClick={handleClick}>Delete</button>
      </div>
    </div>
  </div>
</div>



        </>
    )
}
