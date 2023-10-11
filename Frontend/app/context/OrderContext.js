'use client'

import { createContext, useState } from 'react'

const OrderDetailsContext = createContext();

const OrderDetailsProvider = ({ children }) => {

    const [orderDetails, setOrderDetails] = useState({
        'First Name': '',
        'Last Name': '',
        'Date': '',
        'Contact Number': '',
        'Personal Email': '',
        'University Name': '',
        'University ID': '',
        'University Email': '',
        'Assignment Topic': '',
        'Additional Information': '',
        'Citation': '',
        'Spacing': '',
        'File': null,
        'Terms And Conditions': '',
        'Digital Signature': '',
        'Academic Level': '',
        'Type of Service': '',
        'Type of Paper': '',
        'Subject': 'Subject',
        'Word Limit': 0,
        'Deadline': ''
    })

    return (
        < OrderDetailsContext.Provider value={{ orderDetails, setOrderDetails }} >
            {children}
        </OrderDetailsContext.Provider >
    )
}

export { OrderDetailsContext, OrderDetailsProvider };