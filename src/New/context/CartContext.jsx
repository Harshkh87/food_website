"use client"

import { createContext, useContext, useReducer } from "react"

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && item.specialInstructions === action.payload.specialInstructions,
      )

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id && item.specialInstructions === action.payload.specialInstructions
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }

    case "UPDATE_QUANTITY":
      if (action.payload.quantity === 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              !(item.id === action.payload.id && item.specialInstructions === action.payload.specialInstructions),
          ),
        }
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id && item.specialInstructions === action.payload.specialInstructions
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.id === action.payload.id && item.specialInstructions === action.payload.specialInstructions),
        ),
      }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      }

    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item })
  }

  const updateQuantity = (id, specialInstructions, quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, specialInstructions, quantity },
    })
  }

  const removeFromCart = (id, specialInstructions) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id, specialInstructions },
    })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getItemQuantity = (id, specialInstructions) => {
    const item = state.items.find((item) => item.id === id && item.specialInstructions === specialInstructions)
    return item ? item.quantity : 0
  }

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
