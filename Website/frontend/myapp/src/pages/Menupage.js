import React from 'react'
import Menuitem from '../components/Menuitem'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'
import { useCartContext } from '../hooks/useCartContext'
import "../CSS/menupage.css"

import { useState, useEffect } from 'react'

export default function Menupage() {

  const [menuItems, setMenuItems] = useState(null)
  const [uniqueCategories, setUniqueCategories] = useState([])
  const [activeKey, setActiveKey] = useState(''); // Set the initial active key
  const { name } = useParams();
  const { user } = useAuthContext()
  const { cartItems } = useCartContext()



  useEffect(() => {
    if (user) {
      fetch('/api/menu/getAll/' + name, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setMenuItems(data)

          const categories = new Set();
          data.forEach(item => {
            categories.add(item.category);
          });

          setUniqueCategories(Array.from(categories))

        })
        .catch(error => console.log(error))

    }
  }, [user]);

  useEffect(() => {
    if (uniqueCategories.length > 0) {
      setActiveKey(uniqueCategories[0]);
    }
  }, [uniqueCategories]);





  return (

    <div className="container-fluid">




      {uniqueCategories && (<Nav variant="pills" activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)} className="custom-nav">
        {uniqueCategories.map(category => (
          <Nav.Item key={category}>
            <Nav.Link eventKey={category}>{category}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>)}








      <div className="row">
        {menuItems && menuItems.map(menuItem => (
          (activeKey === menuItem.category) && (
            <div className="col-md-4" key={menuItem.id}>
              <div>
                <Menuitem item={menuItem} restaurantname={name} />
              </div>
            </div>
          )
        ))}
      </div>

    </div>
  )
}
