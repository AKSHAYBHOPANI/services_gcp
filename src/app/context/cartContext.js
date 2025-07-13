import React, { createContext, useState, useEffect } from "react"

export const CartContext = createContext()
const CartContextProvider = (props) => {
  const [cartProducts, setCartProducts] = useState([])

  return <CartContext.Provider value={{ cartProducts, setCartProducts }}>{props.children}</CartContext.Provider>
}
export default CartContextProvider
