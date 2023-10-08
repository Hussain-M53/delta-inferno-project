'use client'

import { createContext, useState } from 'react'

const OrderDetailsContext = createContext();

const OrderDetailsProvider = ({ children }) => {

    const [orderDetails, setOrderDetails] = useState([])

    return (
        < OrderDetailsContext.Provider value={{ orderDetails, setOrderDetails }} >
            {children}
        </OrderDetailsContext.Provider >
    )
}

export { OrderDetailsContext, OrderDetailsProvider };