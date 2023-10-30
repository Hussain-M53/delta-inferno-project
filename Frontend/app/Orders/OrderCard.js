import React from 'react'
import Link from 'next/link'

const OrderCard = ({ id, topic, deadline }) => {

    return (
        <div className='font-serif p-4 mt-6 bg-gray-50 w-full border border-gray-300 shadow-sm rounded-lg flex justify-between items-center'>
            <div>
                <div>
                    <span className='font-bold'>Order ID : </span><span className='text-gray-600'>{id}</span>
                </div>
                <div>
                    <span className='font-bold'>Assignment Topic :  </span><span className='text-gray-600'>{topic}</span>
                </div>
                <div>
                    <span className='font-bold'>Deadline :  </span><span className='text-gray-600'>{deadline}</span>
                </div>
            </div>
            <div className='py-2 px-4 border border-orange-500 text-orange-500 hover:text-white hover:bg-orange-500 rounded-md hover:shadow-md'>
                <Link href={`/Orders/${encodeURIComponent(id)}`}>View Details</Link>
            </div>
        </div>
    )
}

export default OrderCard