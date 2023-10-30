'use client'

import Link from 'next/link';
import { AuthContext } from '../context/AuthContext'
import { useEffect, useContext,useState } from 'react';
import { useRouter } from 'next/navigation';
import OrderCard from './OrderCard.js';
import { getOrders } from '@utils/Orders';

const Page = () => {

  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user.userName == '') {
      router.push('/Login');
    }

    const fetchOrders = async () => {
      const orders = await getOrders(user.userId);
      if (orders.length > 0) {
        console.log(orders);
        setOrders(orders);
      }
    }
    fetchOrders();

  }, [])

  return (
    <div className='my-10 w-4/5 mx-auto'>
      <div className='flex'>
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
      <OrderCard id={'W-234224'} topic={'Economic linearity'} deadline={'3-5 days'} />
      <OrderCard id={'PR-13855'} topic={'Economic linearity'} deadline={'3-5 days'} />
      <OrderCard id={'E-87463'} topic={'Economic linearity'} deadline={'3-5 days'} />

    </div>
  )
}

export default Page

