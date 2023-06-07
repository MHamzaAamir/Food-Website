import React, {useState,useEffect}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route,Navigate} from "react-router-dom"
import { useAuthContext } from './hooks/useAuthContext';

//pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Menupage from './pages/Menupage';
import RestaurantPage from './pages/RestaurantPage';
import CartPage from './pages/CartPage';
import RiderPage from './pages/RiderPage';


//components
import Nav from './components/Nav';


function App(){
  const {user} = useAuthContext()
  const [customer,setCustomer] = useState()


  

  return(
    <>

      <Nav/>

      <Routes>
        
        <Route path = "/" element = {<Navigate to ="/main"/>}/>
        <Route path = "/main" element={user ? ((user.role == "customer") ?<RestaurantPage/> : <RiderPage/> ) : <Navigate to ="/login"/>} />
        <Route path = "/cart" element={user ? ((user.role == "customer") ?<CartPage/> : <Navigate to ="/main"/> ) : <Navigate to ="/login"/>} />
        <Route path = "/menu/:name" element = {user ? ((user.role == "customer") ?<Menupage/> : <Navigate to ="/main"/> ) : <Navigate to ="/login"/>} />
        <Route path = "/login" element = {!user ? <Login/> : <Navigate to ="/main"/>} />
        <Route path = "/signup" element = {!user ? <Signup/> : <Navigate to ="/main"/>} />




        {/* <Route path = "/cart" element={user ? <CartPage/> : <Navigate to ="/login"/>} />
        <Route path = "/menu/:name" element = {user ? <Menupage/> : <Navigate to ="/login"/>} />
        <Route path = "/login" element = {!user ? <Login/> : <Navigate to ="/restaurants"/>} />
        <Route path = "/signup" element = {!user ? <Signup/> : <Navigate to ="/restaurants"/>} />
        <Route path = "/map" element = {<MapPage/>} /> */}
      </Routes> 

    </>
  )
}

export default App;
