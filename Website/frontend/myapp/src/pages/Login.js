import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import "../CSS/login.css"

export default function Login() {
    const [phonenumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(null)
    const [error,setError] = useState(null)
    const {dispatch} = useAuthContext()


    const login = async(phonenumber,password)=>{
        setIsLoading(true)
        setError(null)

        const response = await fetch("/api/user/login",{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({phonenumber,password})
        })

        const json = await response.json()

        if (!response.ok)
        {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok)
        {
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type:'LOGIN', payload:json})
            setIsLoading(false)

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(phonenumber, password)
    }

      

    return (
        <div className = "login-form-container">
            <div className="login-top"></div>

            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" id="phonenumber" name="phonenumber" placeholder="Phonenumber" onChange={(e) => setPhoneNumber(e.target.value)} value={phonenumber} required />
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </div>
                    <button type="submit" disabled={isLoading} className="btn btn-danger">Login</button>
                </form>
                {error && <div className='mt-2'>{error}</div>}
            </div>

        </div>

    )

}
