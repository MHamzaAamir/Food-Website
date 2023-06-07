import React, { createContext, useState , useEffect} from 'react';

// Create the CartContext
export const CartContext = createContext();

// Create a CartProvider component to wrap your application
export const CartContextProvider = ({ children }) => {

  const storedCartItems = localStorage.getItem('cartItems');
  const initialCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

  const [cartItems, setCartItems] = useState(initialCartItems);

  const addItemToCart = (item) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems, item];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter((item) => item.id !== itemId);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const removeAllItems = () =>{
    localStorage.removeItem('cartItems')  
    setCartItems([])
  }


  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  // Context value
  const cartContextValue = {
    cartItems,
    setCartItems,
    addItemToCart,
    removeItemFromCart,
    removeAllItems
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

