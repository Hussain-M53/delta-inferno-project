'use client'

import Link from 'next/link';
import { AuthContext } from '../context/AuthContext'
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';


const Page = () => {

  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user.userName == '') {
      router.push('/Login');
    }
  }, [])

  return (
    <div className='mt-10 w-4/5 mx-auto'>
      <div className='flex '>
        <div className='text-center font-bold text-3xl mb-6 grow'>
          Your Orders
        </div>
        <Link href={'/Orders/new'}>
          <div className="flex w-30 h-10 justify-center items-center rounded-md bg-btn-color px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-300 ease-in-out hover:bg-cyan-400">
            Place New Order
          </div>
        </Link>
      </div>
      <div className='border-b-2 border-gray-300' />
      <div className='p-4 mt-6 w-full border border-gray-100 shadow-md rounded-lg'>
        <div className=''>
          Order Details:
        </div>
        <div>
          Assignment Topic
        </div>
      </div>
    </div>
  )
}

export default Page

