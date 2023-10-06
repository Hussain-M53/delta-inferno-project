'use client'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext'


export default function OrderLayout({ children }) {

    const router = useRouter();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user.userName == '') {
            router.push('/Login');
        }

    }, [])

    return (
        <>
            <head>
                <title>
                    Order - Extpert Assignment Nation
                </title>
            </head>
            <body>
                {children}
            </body>
        </>
    )
}
