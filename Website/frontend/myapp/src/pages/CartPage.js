import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import CartItem from '../components/CartItem'
import { useCartContext } from "../hooks/useCartContext"
import "../CSS/cart.css"
import {Modal} from 'react-bootstrap'
import Map from "../components/Map"
import { useAuthContext } from '../hooks/useAuthContext'
import { useMapContext } from '../hooks/useMapContext'


export default function CardPage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cartItems } = useCartContext()
  const [show, setShow] = useState(false);
  const {removeAllItems} = useCartContext()
  const {user} = useAuthContext()
  const[isLoading,setIsLoading] = useState(false)

  const {lng,lat,location} = useMapContext()


  const submitOrder = async () =>{
    setIsLoading(true)
    const name = user.name
    const phonenumber = user.phonenumber
    const items = cartItems
    const status = "Pending"
    const acceptedby = ""
    const totalprice = totalPrice

    const response = await fetch("/api/order/placeorder",{
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type':'application/json'
      },
      method:"POST",
      body:JSON.stringify({name,phonenumber,items,lng,lat,location,status,acceptedby,totalprice})
    })

    const json = await response.json()


    if (!response.ok)
    {
        setIsLoading(false)
    }
    if (response.ok)
    {
        console.log(response.error)
        setIsLoading(false)
    }

  }
  

  const handleDone = async (e) =>{

    await submitOrder()

    removeAllItems()
    handleClose()
  }


  useEffect(() => {
    // Calculate the total price when cartItems state changes
    calculateTotalPrice();
  }, [cartItems]);

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price;
    });
    setTotalPrice(total);
  };


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <>
      <div className="container">

        {
          (cartItems.length != 0) && 
          
          (cartItems.map((item) => {
            return (
              <>
                <CartItem item={item} />
              </>
            )
          })
          
          )}

          {
            (cartItems.length != 0) && (
              
                <>
                  <div div className="total-price mt-1">
                    Total Price: Rs. {totalPrice}
                  </div>
    
                  <button onClick={handleShow} className="place-order-btn mb-4">
                    Place Order
                  </button>
                </>
            )
          }

        {(cartItems.length == 0) &&
          <div className="empty-cart">
          <div className="container text-center">
            <h1 className="display-4">Cart Is Empty</h1>
          </div>
        </div>
        }

      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Location</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Map/>
          <button className = "btn btn-success mt-1" disabled= {isLoading} onClick={handleDone}>Done</button>
        </Modal.Body>


      </Modal>
    </>

  )
}
