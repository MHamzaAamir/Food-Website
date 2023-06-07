import { useAuthContext } from "./useAuthContext"
import { useCartContext } from "./useCartContext"


export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    const {cartItems,setCartItems} = useCartContext()
    


    const logout = () =>{
        //Delete from storage
        localStorage.removeItem('user')
        setCartItems([])
        localStorage.removeItem('cartItems')

        //dispatch logout
        dispatch({type:'LOGOUT'})
    }

    return {logout}
}
