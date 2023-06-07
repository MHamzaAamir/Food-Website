import React from 'react'
import RestaurantCard from '../components/RestaurantCard'
import {useEffect, useState} from 'react'
import {useAuthContext} from '../hooks/useAuthContext'
import "../CSS/restaurant.css"



export default function RestaurantPage() {
    
    const [restaurants, setRestaurants] = useState(null)
    const {user} = useAuthContext()

    useEffect(()=>{


      if(user)
      {

        fetch("/api/restaurant/getAll",{
          headers:{
            'Authorization': `Bearer ${user.token}`,
            'Content-Type':'application/json'
      }
        })
        .then(response => response.json())
        .then(data => setRestaurants(data))
        .catch(error=>console.log(error))
      }
    },[user])


  return (
    <div>
        {console.log(restaurants)}

        {restaurants && restaurants.map(restaurant =>(
            <RestaurantCard restaurant={restaurant}/> 
        ))}
      
    </div>
  )
}
