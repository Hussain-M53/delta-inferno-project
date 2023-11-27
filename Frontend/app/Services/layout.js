'use client'

import { useEffect, useState } from 'react';
import FloatingCalculator from '../components/FloatingCalculator'
import { fetchData } from '@utils/CMS_Retreival';
import { urlFor } from '@utils/middlewares';
import Image from 'next/image';

// export const metadata = {
//     title: 'Services . Expert Assignment Nation',
//     description: 'Your Expert Content Writer',
// }

export default function Service_Layout({ children }) {
    const [headerData, setHeaderData] = useState({});

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                const data = await fetchData('service_images');
                if (data && data.result && data.result.length > 0) {
                    setHeaderData((prevData) => ({
                        ...prevData,
                        'top_image': data.result[0].top_image,
                        'side_image': data.result[0].panel_image,
                    }));
                }
            } catch (error) {
                console.error('Error fetching and setting data:', error);
            }
        };

        fetchDataAndSetState();
    }, []);

    return (
        <div className='flex flex-col sm:flex-row justify-center gap-2 mx-2'>
            <div className='sm:w-1/3 h-screen sm:order-2 sm:block'>
                <FloatingCalculator />
                <div className='hidden sm:mt-4 sm:h-screen sm:block'>
                    {headerData.panel_image && <Image src={urlFor(headerData.panel_image?.asset._ref)}
                        width={300} height={1000}
                        alt="" />}
                </div>
            </div>
            <div className='w-full sm:order-1'>
                <div className='w-full h-52 mb-4'>
                    {headerData.top_image && <Image src={urlFor(headerData.top_image?.asset._ref)}
                        width={1000} height={200}
                        alt="" />}
                </div>
                {children}
            </div>
        </div>
    )
}
