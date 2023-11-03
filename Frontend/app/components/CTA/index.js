'use client'
import { fetchData } from '@utils/CMS_Retreival'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CTA = () => {
  const [content, setContent] = useState({})

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchData('ctaSection');
        if (data && data.result && data.result.length > 0) {
          setContent((prevData) => ({
            ...prevData,
            'title': data.result[0].title,
            'image': data.result[0].image,
            'buttonText': data.result[0].buttonText,
          }));
        }
      } catch (error) {
        console.error('Error fetching and setting data:', error);
      }
    };

    fetchDataAndSetState();
  }, []);

  return (
    <div className='grid grid-cols-2 bg-gray-900 w-9/10 h-60 md:h-72 rounded-xl mx-auto'>
      <div className='col-span-1 p-8 mx-auto'>
        <Image src='assets/ils_06.svg' width={400} height={400} />
      </div>
      <div className='text-white col-span-1 p-8 flex flex-col justify-center space-y-8 items-start'>
        <div className='font-bold text-xl sm:text-2xl md:text-4xl'>
          {content.title}
        </div>
        <Link href={'/Orders/new'}>
          <div className="flex w-30 h-10 justify-center items-center rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-300 ease-in-out hover:bg-btn-color">
            {content.buttonText}
          </div>
        </Link>
      </div>
    </div>
  )
}

export default CTA