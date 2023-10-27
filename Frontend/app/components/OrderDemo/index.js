'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const OrderDemo = () => {
    const steps = [
        {
            'image': '/assests/step1.png',
            'title': 'Sign up and complete the form',
            'desc': 'Create an account or simply log in to our online essay writing service. In the order form, state what you need and by when. Include some of your previous work so that the expert can write an essay in your style. Choose whether you want a certain writer to bid on your order or make it visible to all writers on the platform.'
        }, {
            'image': '/assests/step3.png',
            'title': 'Receive the completed work',
            'desc': 'Track your order on our essay service and wait for its completion. Once your writer is done, you will receive an email notification. Check the writing, see if it fits your requirements and either request free edits or proceed to the final steps. Once you\'re 110% satisfied, end the contract and pay your professional essay writer.Our service values your feedback so speak up.'
        }
    ]
    const [selectedStep, setSelectedStep] = useState(1)
    const [selectedStepData, setSelectedStepdData] = useState({
        'image': '/assests/step1.png',
        'title': 'Sign up and complete the form',
        'desc': 'Create an account or simply log in to our online essay writing service. In the order form, state what you need and by when. Include some of your previous work so that the expert can write an essay in your style. Choose whether you want a certain writer to bid on your order or make it visible to all writers on the platform.'
    });

    return (
        <div className='py-20 md:px-16 lg:px-28 bg-gray-50 w-full min-h-screen flex flex-col items-center'>
            <div className='font-bold text-3xl'>Get writing help in 2 steps</div>
            <div className='mt-12 mb-6 flex gap-x-8 justify-between items-center '>
                <div onClick={() => { setSelectedStepdData(steps[0]); setSelectedStep(1) }} className={`${selectedStep == 1 ? 'bg-gray-600 text-white' : null} bg-white py-2 px-10 rounded-md font-serif hover:bg-gray-300 hover:text-white`}>Step 1</div>
                <div onClick={() => { setSelectedStepdData(steps[1]); setSelectedStep(2) }} className={`${selectedStep == 2 ? 'bg-gray-600 text-white' : null} bg-white py-2 px-10 rounded-md font-serif hover:bg-gray-300 hover:text-white`}>Step 2</div>
            </div>
            <div className='px-10 md:px-0 flex flex-col items-center md:grid md:grid-cols-2 gap-x-4'>
                <div>
                    <Image src={selectedStepData['image']} width={500} height={500} />
                </div>
                <div className='mt-10 md:mt-0 flex flex-col items-center md:items-start'>
                    <div className='text-2xl font-bold'>{selectedStepData['title']}</div>
                    <div className='mt-4 md:mt-10 text-sm'>{selectedStepData['desc']}</div>
                    <div className='text-sm md:text-md mt-4 md:mt-10 w-fit py-2 px-6 border-2 border-orange-500 text-orange-600 rounded-md hover:bg-orange-500 hover:text-white'>
                        <Link href='/Orders/new'>
                            Place Order Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDemo