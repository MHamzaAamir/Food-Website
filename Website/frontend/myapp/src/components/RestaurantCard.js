import React from 'react'
import { Link } from 'react-router-dom';



export default function RestaurantCard({restaurant}) {
    const preURL = "../photos/"

    return (
        <div>
            {restaurant && (
       
            <div className="container">
                <Link to = {"/menu/" + restaurant.name} className="card my-5">
                    <img src = {`/photos/` + restaurant.imageURL}  className="card-img-top" alt="Restaurant Image"/>
                        <div className="card-body">
                            <h5 className="card-title">{restaurant.name}</h5>
                            <p className="card-text">{restaurant.subheading}</p>

                        </div>
                </Link>
            </div>
  
            )}

        </div>
    )
}

// src={preURL + restaurant.imageURL}