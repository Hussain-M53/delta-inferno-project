'use client'

import { getOrder } from '@utils/Orders';
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext'

const OrderDetails = ({ params }) => {
    const { user } = useContext(AuthContext);
    const [order, setOrder] = useState({
        'Full Name': '',
        'Email': '',
        'Assignment Topic': '',
        'Additional Information': '',
        'Citation': 'Citation',
        'Spacing': 'Spacing',
        'Academic Level': 'Academic Level',
        'Type of Service': '',
        'Type of Paper': 'Type of Paper',
        'Subject': 'Subject',
        'Word Limit': null,
        'Deadline': 'Deadline',
        'Fee': 0
    });
    const router = useRouter();

    useEffect(() => {
        if (user.userName == '') {
            console.log('user exist')
            router.push('/Login')
        }

        const fetchOrders = async () => {
            const ord = await getOrder();
            if (ord.length > 0) {
                console.log(ord);
                setOrder(ord.data);
            }
        }
        fetchOrders();
    }, [])

    return (
        <div className='py-10 h-fit bg-gray-100 flex flex-col items-center'>
            <div className='text-4xl font-bold'>OrderDetails</div>
            <div className='w-3/5 h-fit p-4 bg-white mt-4 '>
                <div className='flex justify-between px-4 py-3 bg-gray-200 rounded-md mb-1'>
                    <div className='font-bold'>Order Id</div>
                    <div>{params.slug}</div>
                </div>
                <div className='flex justify-between px-4 py-3 bg-gray-200 rounded-md mb-1'>
                    <div className='font-bold'>Assignment Topic</div>
                    <div>{order['Assignment Topic']}</div>
                </div>
                <div className='flex justify-between px-4 py-3 bg-gray-200 rounded-md mb-1'>
                    <div className='font-bold'>Academic Level</div>
                    <div>{order['Academic Level']}</div>
                </div>
                <div className='flex justify-between px-4 py-3 bg-gray-200 rounded-md mb-1'>
                    <div className='font-bold'>Type of Service</div>
                    <div>{order['Type of Service']}</div>
                </div>
                <div className='flex justify-between px-4 py-3 bg-gray-200 rounded-md mb-1'>
                    <div className='font-bold'>Type of Paper</div>
                    <div>{order['Type of Paper']}</div>
                </div>
                <div className='flex justify-between px-4 py-3 bg-gray-200 rounded-md mb-1'>
                    <div className='font-bold'>Subject</div>
                    <div>{order['Subject']}</div>
                </div>
                <div className='flex justify-between px-4 py-3 bg-gray-200 rounded-md mb-1'>
                    <div className='font-bold'>Word Limit</div>
                    <div>{order['Word Limit']}</div>
                </div>
                <div className='flex justify-between px-4 py-3 bg-gray-200 rounded-md mb-1'>
                    <div className='font-bold'>Deadline</div>
                    <div>{order['Deadline']}</div>
                </div>
                <div className='flex justify-between px-4 py-3 bg-gray-200 rounded-md mb-1'>
                    <div className='font-bold'>Spacing</div>
                    <div>{order['Spacing']}</div>
                </div>
                <div className='flex justify-between px-4 py-3 bg-gray-200 rounded-md mb-1'>
                    <div className='font-bold'>Citation</div>
                    <div>{order['Citation']}</div>
                </div>
                <div className='flex justify-between px-4 py-3 bg-gray-200 rounded-md mb-1'>
                    <div className='font-bold'>Instructions</div>
                    <div>{order['Additional Information']}</div>
                </div>
                <div className='flex justify-between px-4 py-3 font-bold text-xl bg-gray-200 rounded-md'>
                    <div>Total Amount</div>
                    <div>$ {order['Fee']}</div>
                </div>
            </div>
            <div>Deliverable</div>
        </div>
    )
}

export default OrderDetails