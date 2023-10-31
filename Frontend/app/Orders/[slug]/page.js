'use client'

import { getOrder } from '@utils/Orders';
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext'

const OrderDetails = ({ params }) => {
    const { user } = useContext(AuthContext);
    const [order, setOrder] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (user.userName == '') {
            router.push('/Login');
        }

        const fetchOrders = async () => {
            const ord = await getOrder();
            if (ord.length > 0) {
                console.log(ord);
                setOrder(ord);
            }
        }
        fetchOrders();
    }, [])

    return (
        <div className='py-10 h-screen bg-gray-100 flex flex-col items-center'>
            <div className='text-4xl font-bold'>OrderDetails</div>
            <div className='w-4/5 h-fit p-4 bg-white mt-4 '>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Order Id</div>
                    <div>{params.slug}</div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Assignment Topic</div>
                    <div>{order?.data['Assignment Topic']}</div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Academic Level</div>
                    <div>{order?.data['Academic Level']}</div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Type of Service</div>
                    <div>{order?.data['Type of Service']}</div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Type of Paper</div>
                    <div>{order?.data['Type of Paper']}</div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Subject</div>
                    <div>{order?.data['Subject']}</div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Word Limit</div>
                    <div>{order?.data['Word Limit']}</div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Deadline</div>
                    <div>{order?.data['Deadline']}</div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Spacing</div>
                    <div>{order?.data['Spacing']}</div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Citation</div>
                    <div>{order?.data['Citation']}</div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Instructions</div>
                    <div>{order?.data['Additional Information']}</div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md'>
                    <div>Total Amount</div>
                    <div>{order?.data['Fee']}</div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails