'use client'

import Link from 'next/link';
import { AuthContext } from '../context/AuthContext'
import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import OrderCard from './OrderCard.js';
import { getOrders } from '@utils/Orders';

const Page = () => {

  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [orders, setOrders] = useState([
  ]);
  
  useEffect(() => {
      const fetchOrders = async () => {
          if (!user.userId || user.userName === '') {
              console.log('User is not authenticated or does not have a username');
              router.push('/Login');
          } else {
              const ord = await getOrders(user.userId);
              if (ord.length > 0) {
                  setOrders(ord);
              }
          }
      };
  
      fetchOrders();
  }, []);

  
  return (
    <div className='my-10 w-4/5 mx-auto'>
      <div className='flex'>
        <div className='text-center font-bold text-2xl sm:text-3xl mb-6 grow'>
          Your Orders
        </div>
        <Link href={'/Orders/new'}>
          <div className=" sm:text-base flex justify-center items-center rounded-md bg-btn-color px-2 py-2 sm:px-3.5 sm:py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-300 ease-in-out hover:bg-cyan-400">
            Place New Order
          </div>
        </Link>
      </div>
      <div className='border-b-2 border-gray-200' />
      {orders.map((order) => (
        <OrderCard id={order.id} topic={order.data['Assignment Topic']} deadline={order.data['Deadline']} />
      ))}
    </div>
  )
}

export default Page

