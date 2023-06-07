import React from 'react'
import {useAuthContext} from "../hooks/useAuthContext"
import {useState,useEffect} from "react"
import {Modal} from "react-bootstrap"
import MapRider from "../components/MapRider"
import "../CSS/rider.css"

export default function RiderCard({order}) {

    const [accepted, setAccepted] = useState(false)
    const [completed, setCompleted] = useState(true)
    const [error, setError] = useState(null)
    const {user} = useAuthContext()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleAccept = async() =>{
        const id = order._id
        const phonenumber = user.phonenumber
        if(!accepted)
        {
            const response = await fetch("/api/order/updatenumber",{
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body:JSON.stringify({id,phonenumber})
            })
            
            if (response.ok)
            {
                order.acceptedby = user.phonenumber
                setAccepted(true)
            }
            

        }
    }

    const handleComplete = async() =>{
        const id = order._id
        const response = await fetch("/api/order/delete/"+ id,{
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        })
        if (response.ok)
        {
            console.log("wow")
            order.status = "Completed"
            setCompleted(true)
        }
    }


    useEffect(()=>{
        if(order.acceptedby == "")
        {
            setAccepted(false)
        }else
        {
            setAccepted(true)
        }

        if(accepted)
        {
            setCompleted(false)
        }
    },[accepted])

  

    return (
        // <div>
        //     {order && (
       
        //     <div className="container">
        //             <div className="">
        //                 <h5 className="">Location: {order.location}</h5>
        //                 <p className="">Customer Name:{order.name}</p>
        //                 <p className="">PhoneNumber:{order.phonenumber}</p>
        //                 <p className="">TotalPrice:{order.totalprice}</p>
        //                 <p className="">AcceptedBy:{order.acceptedby}</p>
        //                 <p className="">Status:{order.status}</p>
                        
        //             </div>
        //             <div>
        //                 Items:
        //                 {order.items.map((item)=>{
        //                     return <>
        //                     <p>{item.name}</p>
        //                     <p>{item.variant}</p>
        //                     <p>{item.restaurant}</p>
        //                     <p>_________________________________</p>
        //                     </>
        //                 })}
        //             </div>
        //             <button disabled = {accepted} onClick = {handleAccept}>Accept</button>
        //             <button disabled = {completed} onClick = {handleComplete}>Complete</button>
        //             <button onClick = {handleShow}>Show on Map</button>
        //     </div>
  
        //     )}

        // HTML
        <>
        <div className="rider-card card my-4">
        {order && (
            <div className="container">
            <div className="rider-card-header card-header">
                <h5 className="rider-card-title card-title">Location: {order.location}</h5>
            </div>
            <div className="rider-card-body card-body">
                <p className="rider-card-text">Customer Name: {order.name}</p>
                <p className="rider-card-text">PhoneNumber: {order.phonenumber}</p>
                <p className="rider-card-text">TotalPrice: {order.totalprice}</p>
                <p className="rider-card-text">AcceptedBy: {order.acceptedby}</p>
                <p className="rider-card-text">Status: {order.status}</p>
            </div>
            <div className="rider-card-footer card-footer">
                <p className="rider-card-text">Items:</p>
                {order.items.map((item) => (
                <div key={item.id} className="rider-card-item">
                    <p>{item.name} | {item.variant} | {item.restaurant}</p>

                    <hr className="rider-card-divider" />
                </div>
                ))}
            </div>
            <div className="rider-card-actions card-actions">
                <button disabled={accepted} onClick={handleAccept} className="btn btn-primary mt-2">Accept</button>
                <button disabled={completed} onClick={handleComplete} className="btn btn-success mt-2">Complete</button>
                <button onClick={handleShow} className="btn btn-secondary mt-2 ms-2">Show on Map</button>
            </div>
            </div>
        )}
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Destination</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <MapRider lng = {order.lng} lat = {order.lat} />
        </Modal.Body>


      </Modal>

          

      </>
    )
}

