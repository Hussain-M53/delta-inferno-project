'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import { urlFor } from "@utils/middlewares";
import { fetchData } from '@utils/CMS_Retreival';

const OrderDemo = () => {

    const [steps, setSteps] = useState([]);
    const cardRef = useRef();
    const [isVisible, setIsVisible] = useState(false);
    const [selectedStep, setSelectedStep] = useState(0)

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

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                const data = await fetchData('orderDemo');
                if (data && data.result && data.result.length > 0) {
                    setSteps([
                        {
                            'title': data.result[0].titleStep1,
                            'description': data.result[0].descriptionStep1,
                            'mainImage': data.result[0].mainImageStep1,
                        },
                        {
                            'title': data.result[0].titleStep2,
                            'description': data.result[0].descriptionStep2,
                            'mainImage': data.result[0].mainImageStep2,
                        },
                        {
                            'title': data.result[0].titleStep3,
                            'description': data.result[0].descriptionStep3,
                            'mainImage': data.result[0].mainImageStep3,
                        }
                    ]);
                }
            } catch (error) {
                console.error('Error fetching and setting data:', error);
            }
        };

        fetchDataAndSetState();
    }, []);

    return (
        <div className=' py-12 md:px-12 lg:px-20 bg-gray-900 sm:w-4/5 sm:rounded-3xl shadow-2xl mx-auto h-fit flex flex-col items-center'>
            <div className='font-bold text-3xl sm:text-5xl text-white text-center px-2'>Get writing help in 3 steps</div>
            <div className='mt-12 mb-6 flex gap-x-4 sm:gap-x-8 justify-between items-center '>
                <div onClick={() => setSelectedStep(0)} className={`${selectedStep == 0 ? 'bg-gray-700 text-white' : 'bg-white text-black'} hover:cursor-pointer px-4 py-1 sm:py-2 sm:px-10 rounded-md font-serif hover:bg-gray-300 hover:text-white`}>Step 1</div>
                <div onClick={() => setSelectedStep(1)} className={`${selectedStep == 1 ? 'bg-gray-700 text-white' : 'bg-white text-black'} hover:cursor-pointer px-4 py-1 sm:py-2 sm:px-10  rounded-md font-serif hover:bg-gray-300 hover:text-white`}>Step 2</div>
                <div onClick={() => setSelectedStep(2)} className={`${selectedStep == 2 ? 'bg-gray-700 text-white' : 'bg-white text-black'} hover:cursor-pointer px-4 py-1 sm:py-2 sm:px-10 rounded-md font-serif hover:bg-gray-300 hover:text-white`}>Step 3</div>

            </div>
            <div className='px-10 md:px-0 flex flex-col items-center md:grid md:grid-cols-2 gap-x-4'>
                {steps[selectedStep]?.mainImage &&
                    <div ref={cardRef} className={`m-auto w-full text-center md:flex-auto md:text-left transform transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-95'}`}>
                        <Image src={urlFor(steps[selectedStep]?.mainImage.asset._ref)} alt="Step Illustration" width={500} height={500} />
                    </div>
                }
                <div ref={cardRef} className={`w-full md:m-auto h-full transform transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'} mt-10 md:mt-0 flex flex-col items-center justify-center md:items-start `}>
                    <div className='text-white text-2xl font-bold'>{steps[selectedStep]?.title}</div>
                    <div className='text-center sm:text-start text-white mt-4 md:mt-8 text-sm'>{steps[selectedStep]?.description}</div>
                    <div className='mx-auto text-sm md:text-md mt-4 md:mt-8 w-fit py-2 px-6 border-2 hover:border-orange-500 hover:text-orange-500 hover:bg-transparent rounded-md bg-orange-500 text-white'>
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