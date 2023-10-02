'use client'

import { createContext, useState } from 'react'

const PostContext = createContext();

const PostProvider = ({ children }) => {

    const [selectedPost, setSelectedPost] = useState({
        'id': '',
        'title': '',
        'date': '',
        'category': '',
        'body': '',
    })

    return (
        < PostContext.Provider value={{ selectedPost, setSelectedPost }} >
            {children}
        </PostContext.Provider >
    )
}

export { PostContext, PostProvider };