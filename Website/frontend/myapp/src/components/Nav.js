import React from 'react'

import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCartContext } from '../hooks/useCartContext'
import { useLogout } from '../hooks/useLogout'



export default function Nav() {
    const {cartItems} = useCartContext()
    const { logout } = useLogout()
    const { user } = useAuthContext()

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Zip N Zap</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {user &&
                                (<li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        {user.name}
                                    </Link>
                                </li>)
                            }

                            {user &&
                                (<>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/main">
                                            Main
                                        </Link>
                                    </li>

                                    {(user.role == "customer") &&
                                    (<li className="nav-item">
                                        <Link className="nav-link" to="/cart">
                                            {`Cart ` + `(${cartItems.length})`} 
                                        </Link>
                                    </li>)}

                                    <div className="mx-2">
                                        <button className="btn btn-primary" onClick={logout}>Logout</button>
                                    </div>
                                </>)}
                            {
                                !user &&
                                (<>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/signup">Signup</Link>
                                    </li>
                                </>)
                            }

                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}









