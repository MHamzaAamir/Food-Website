import React, { useState,useEffect } from "react";
import {useCartContext} from "../hooks/useCartContext"
import {Modal} from 'react-bootstrap'
import "../CSS/menuitem.css"


export default function Menuitem({ item,restaurantname }) {
  const [quantity, setquantity] = useState(1);
  const [varient, setvarient] = useState("");
  const [show, setShow] = useState(false);
  const {cartItems,addItemToCart} = useCartContext()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createMenuItem = () => {
    const newMenuItem = {
      id: Math.random().toString(36).substr(2, 9),
      name :item.name,
      variant: varient,
      price: item.prices[0][varient] * quantity,
      quantity: quantity,
      restaurant: restaurantname,
      category: item.category,
      imageURL: `/photos/`+ item.image
    }
  
    const isIdUnique = cartItems.every((menuItem) => menuItem.id !== newMenuItem.id);
  
    if (isIdUnique) {
      return newMenuItem;
    } else {
      // If the generated ID is not unique, recursively call the function to generate another ID
      return createMenuItem();
    }
  };

  const addToCart = () =>{

    const menuitem = createMenuItem()
    addItemToCart(menuitem)

    console.log("item Added")
  }


  useEffect(()=>{
    setvarient(item.varients[0])

  },[])



  return (
    // <div style={{margin:'1vw'}} className="shadow-lg p-3 mb-5 bg-white rounded">
    //     <div>
    //     <h1>{item.name}</h1>
    //   <img
    //     src = {`/photos/`+ item.image}
    //     alt="Can't Find Image"
    //     style={{ height: "200px", width: "200px" }}
    //   />
    // </div>


    //   <div className="flex-container">
    //     <div className="w-50 my-1">
    //       <p>Varients</p>
    //       <select className="form-control custom-select"
    //         value={varient}
    //         onChange={(e) => {
    //           setvarient(e.target.value);
    //         }}
    //       >
    //         {item.varients.map((varient) => {
    //           return <option value={varient}>{varient}</option>;
    //         })}
    //       </select>
    //     </div>

    //     <div className="w-50 my-1">
    //       <p>Quantity</p>
    //       <select className="form-control custom-select"
    //         value={quantity}
    //         onChange={(e) => {
    //           setquantity(e.target.value);
    //         }}
    //       >
    //         {[...Array(10).keys()].map((x, i) => {
    //           return <option value={i + 1}>{i + 1}</option>;
    //         })}
    //       </select>
    //     </div>
    //   </div>

    //   <div className="flex-container">
    //     <div className="m-1 w-100">
    //       <h4 className="my-2">Price : Rs {item.prices[0][varient] * quantity}</h4>
    //     </div>

    //     <div className="w-100">
    //       <button className="m-1 btn btn-success" onClick={addToCart}>Add To Cart</button>
    //       <button className="m-1 btn btn-success" onClick={handleShow}>Details</button>
    //     </div>
        
    //   </div>
    <div className="card-container shadow-lg p-3 mb-5 bg-white rounded">
  <div>
    <h1>{item.name}</h1>
    <img
      src={`/photos/${item.image}`}
      alt="Can't Find Image"
      className="card-image"
    />
  </div>

  <div className="flex-container">
    <div className="w-50 my-1">
      <p>Variants</p>
      <select
        className="form-control custom-select"
        value={varient}
        onChange={(e) => {
          setvarient(e.target.value);
        }}
      >
        {item.varients.map((varient) => (
          <option value={varient} key={varient}>{varient}</option>
        ))}
      </select>
    </div>

    <div className="w-50 my-1">
      <p>Quantity</p>
      <select
        className="form-control custom-select"
        value={quantity}
        onChange={(e) => {
          setquantity(e.target.value);
        }}
      >
        {[...Array(10).keys()].map((x, i) => (
          <option value={i + 1} key={i + 1}>{i + 1}</option>
        ))}
      </select>
    </div>
  </div>

  <div className="flex-container">
    <div className="m-1 w-100">
      <h4 className="my-2">Price: Rs {item.prices[0][varient] * quantity}</h4>
    </div>

    <div className="w-100">
      <button className="m-1 btn btn-success" onClick={addToCart}>Add To Cart</button>
      <button className="m-1 btn btn-success" onClick={handleShow}>Details</button>
    </div>
  </div>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{item.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img src={`/photos/`+ item.image} className="img-fluid" style={{height:'400px',width:'500px'}} />
          <p>{item.description}</p>
        </Modal.Body>

        <Modal.Footer>
            <button className="btn" onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>


    </div>
  );
}
