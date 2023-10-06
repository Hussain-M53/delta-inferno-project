'use client'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext'


// export const metadata = {
//     title: 'Order . Expert Assignment Nation',
//     description: 'Your Expert Content Writer',
// }

export default function BlogLayout({ children }) {

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
