import React from 'react'
import RiderCard from '../components/RiderCard'
import {useEffect, useState} from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import "../CSS/restaurant.css"



export default function RiderPage() {
    
    const [orders, setOrders] = useState(null)
    const {user} = useAuthContext()

    useEffect(()=>{

      if(user)
      {

        fetch("/api/order/getAll/"+user.phonenumber,{
          headers:{
            'Authorization': `Bearer ${user.token}`,
            'Content-Type':'application/json'
      }
        })
        .then(response => response.json())
        .then(data => setOrders(data))
        .catch(error=>console.log(error))
      }
    },[])


  return (
    <div>

        {console.log(orders)}

        {orders && orders.order.map(order =>(
            <RiderCard order={order}/> 
        ))}

      
    </div>
  )
}
