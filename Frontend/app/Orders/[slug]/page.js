import React from 'react'

const OrderDetails = ({ params }) => {
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
                    <div></div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Academic Level</div>
                    <div></div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Type of Service</div>
                    <div></div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Type of Paper</div>
                    <div></div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Subject</div>
                    <div></div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Word Limit</div>
                    <div></div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Deadline</div>
                    <div></div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Spacing</div>
                    <div></div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Citation</div>
                    <div></div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md mb-1'>
                    <div>Instructions</div>
                    <div></div>
                </div>
                <div className='flex justify-between px-2 py-1 bg-gray-200 rounded-md'>
                    <div>Total Amount</div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails