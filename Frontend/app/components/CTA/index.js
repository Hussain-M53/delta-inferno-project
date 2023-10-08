'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CTA = () => {
    const [content, setContent] = useState({

    })

    useEffect(() => {

    }, [])

    return (
        <div className='grid grid-cols-2 bg-gray-900 w-9/10 h-60 md:h-72 rounded-xl mx-auto'>
            <div className='col-span-1 p-8 mx-auto'>
                <Image src='assests/ils_06.svg' width={400} height={400}/>
            </div>
            <div className='text-white col-span-1 p-8 flex flex-col justify-center space-y-8 items-start'>
                <div className='font-bold text-xl sm:text-2xl md:text-4xl'>
                    Ready for the help from essay writing service?
                </div>
                <Link href={'/Orders/new'}>
                    <div className="flex w-30 h-10 justify-center items-center rounded-md bg-btn-color px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-300 ease-in-out hover:bg-cyan-400">
                        Place Your Order Now
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default CTA