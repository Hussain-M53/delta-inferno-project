'use client'

import { createContext, useState } from 'react'

const OrderDetailsContext = createContext();

const OrderDetailsProvider = ({ children }) => {

    const [orderDetails, setOrderDetails] = useState({
        'Full Name': '',
        'Email': '',
        'Contact Number': '',
        'Country Code': '',
        'Assignment Topic': '',
        'Academic Level': 'Academic Level',
        'Type of Service': '',
        'Type of Paper': 'Type of Paper',
        'Subject': 'Subject',
        'Word Limit': null,
        'Deadline': 'Deadline',
        'Fee' : 0
    })

    return (
        < OrderDetailsContext.Provider value={{ orderDetails, setOrderDetails }} >
            {children}
        </OrderDetailsContext.Provider >
    )
}

export { OrderDetailsContext, OrderDetailsProvider };