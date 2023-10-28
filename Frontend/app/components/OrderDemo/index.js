'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'



const OrderDemo = () => {

    const steps = [
        {
            'image': 'step1.png',
            'title': 'Sign up and complete the form',
            'desc': 'Create an account or simply log in to our online essay writing service. In the order form, state what you need and by when. Include some of your previous work so that the expert can write an essay in your style. Choose whether you want a certain writer to bid on your order or make it visible to all writers on the platform.'
        }, {
            'image': 'step2.png',
            'title': 'Sign up and complete the form',
            'desc': 'Create an account or simply log in to our online essay writing service. In the order form, state what you need and by when. Include some of your previous work so that the expert can write an essay in your style. Choose whether you want a certain writer to bid on your order or make it visible to all writers on the platform.'
        }, {
            'image': 'step3.png',
            'title': 'Receive the completed work',
            'desc': 'Track your order on our essay service and wait for its completion. Once your writer is done, you will receive an email notification. Check the writing, see if it fits your requirements and either request free edits or proceed to the final steps. Once you\'re 110% satisfied, end the contract and pay your professional essay writer.Our service values your feedback so speak up.'
        }
    ]
    const cardRef = useRef();
    const [isVisible, setIsVisible] = useState(false);
    const [selectedStep, setSelectedStep] = useState(1)
    const [selectedStepData, setSelectedStepdData] = useState({
        'image': 'step1.png',
        'title': 'Sign up and complete the form',
        'desc': 'Create an account or simply log in to our online essay writing service. In the order form, state what you need and by when. Include some of your previous work so that the expert can write an essay in your style. Choose whether you want a certain writer to bid on your order or make it visible to all writers on the platform.'
    });

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                setIsVisible(entry.isIntersecting);
            });
        }, { threshold: 0.5 });

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }
        return () => observer.disconnect();
    }, []);

    return (
        <div className=' py-20 md:px-16 lg:px-28 bg-gray-900 sm:w-4/5 sm:rounded-3xl shadow-2xl mx-auto min-h-screen flex flex-col items-center'>
            <div className='font-bold text-3xl text-white text-center px-2'>Get writing help in 3 steps</div>
            <div className='mt-12 mb-6 flex gap-x-4 sm:gap-x-8 justify-between items-center '>
                <div onClick={() => { setSelectedStepdData(steps[0]); setSelectedStep(1) }} className={`${selectedStep == 1 ? 'bg-gray-700 text-white' : 'bg-white text-black'} px-4 py-1 sm:py-2 sm:px-10 rounded-md font-serif hover:bg-gray-300 hover:text-white`}>Step 1</div>
                <div onClick={() => { setSelectedStepdData(steps[1]); setSelectedStep(2) }} className={`${selectedStep == 2 ? 'bg-gray-700 text-white' : 'bg-white text-black'} px-4 py-1 sm:py-2 sm:px-10  rounded-md font-serif hover:bg-gray-300 hover:text-white`}>Step 2</div>
                <div onClick={() => { setSelectedStepdData(steps[2]); setSelectedStep(3) }} className={`${selectedStep == 3 ? 'bg-gray-700 text-white' : 'bg-white text-black'} px-4 py-1 sm:py-2 sm:px-10 rounded-md font-serif hover:bg-gray-300 hover:text-white`}>Step 3</div>

            </div>
            <div className='px-10 md:px-0 flex flex-col items-center md:grid md:grid-cols-2 gap-x-4'>
                <div ref={cardRef} className={`m-auto w-full text-center md:flex-auto md:text-left transform transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-95'}`}>
                    <Image src={`/assets/${selectedStepData['image']}`} alt="Step Illustration" width={500} height={500} />
                </div>
                <div ref={cardRef} className={`mt-6 w-full md:m-auto h-full transform transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'} mt-10 md:mt-0 flex flex-col items-center md:items-start `}>
                    <div className='text-white text-2xl font-bold'>{selectedStepData['title']}</div>
                    <div className='text-white mt-4 md:mt-10 text-sm'>{selectedStepData['desc']}</div>
                    <div className='text-sm md:text-md mt-4 md:mt-10 w-fit py-2 px-6 border-2 border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white'>
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