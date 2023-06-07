import { useState ,useEffect} from 'react'
import {useAuthContext} from '../hooks/useAuthContext'

import "../CSS/signup.css"



export default function Signup() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phonenumber, setPhoneNumber] = useState('')
    const [vehicle, setVehicle] = useState('')
    const [vehicleDisable, setVehicleDisable] = useState(false)
    const [role, setRole] = useState('customer')
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()


    const signup = async(name,phonenumber,password,role,vehicle)=>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({name,phonenumber,password,role,vehicle})
        })

        const json = await response.json()

        if(!response.ok)
        {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok)
        {
            localStorage.setItem('user',JSON.stringify(json))

            dispatch({type:'LOGIN',payload:json})

            setIsLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()



        if (name === "" || password === "" || confirmPassword === "" || phonenumber === "" || role === "" )
        {
            setError("All Fields must be filled")
 
        }
        else if (confirmPassword !== password)
        {
            setError("Passwords don't match")

        }else if(role === "rider" && vehicle === "")
        {
            setError("Vehicle cant be empty")
        }else if (phonenumber.length != 11)
        {
            setError("Invalid Number Length")
        }else if (password.length < 8)
        {
            setError("Minimum password length should be 8")
        }
        else{
            await signup(name,phonenumber,password,role,vehicle)
        }

    }



    useEffect(()=>{
        if (role === "rider")
        {
            setVehicleDisable(false)
        }else if (role === "customer")
        {
            setVehicleDisable(true)
            setVehicle('')
        }
    },[role])

    return (
        <div className = "signup-form-container">
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form>
                <div className="form-group">
                    <input type="text" id="name" name="name" placeholder="Name" onChange={(e)=>setName(e.target.value)} value = {name} required/>
                </div>
                <div className="form-group">
                    <input type="text" id="phonenumber" name="phonenumber" placeholder="Phone Number" onChange={(e)=>setPhoneNumber(e.target.value)} value = {phonenumber} required/>
                </div>
                <div className="form-group">
                    <input type="password" id="password" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value = {password} required/>
                </div>
                <div className="form-group">
                    <input type="password" id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)} value = {confirmPassword} required/>
                </div>
                <div className="form-group">
                    <select id="userrole" name="userrole" onChange={(e)=>setRole(e.target.value)} value = {role}>
                        <option value="rider">Rider</option>
                        <option value="customer">Customer</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="type" id="vehicle" name="vehicle" disabled = {vehicleDisable} placeholder="Vehicle Number" onChange={(e)=>setVehicle(e.target.value)} value = {vehicle} required/>
                </div>
                <button type="submit" disabled = {isLoading} onClick = {handleSubmit} className="btn btn-primary">Sign Up</button>
                {error && (<div>{error}</div>)}
            </form>
        </div>
        
        </div>
    )

}






