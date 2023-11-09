'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { checkUserAuthentication } from "@utils/auth";
import { storeOrder } from '@utils/Orders';

const Thankyou = () => {

    useEffect(() => {
        const storeFormData = async () => {
            const orderDetails = JSON.parse(localStorage.getItem('OrderDetails'));

            if (orderDetails['Full Name'] != '') {
                checkUserAuthentication().then(async currentUser => {
                    if (currentUser) {
                        await storeOrder(currentUser.uid, orderDetails);

                    } else {
                        await storeOrder("", orderDetails);
                    }
                })
            }

        }
        storeFormData();
    }, [])

    return (
        <div className='relative h-fit flex flex-col items-center justify-center py-8 gap-y-4'>
            <div className='-z-10 absolute w-full top-20 left-2 md:left-24 right-0'>
                <Image src='/assets/Shapes.svg' width={1000} height={1000} />
            </div>
            <div className='font-bold text-2xl sm:text-3xl'>
                Congratutions!!! Your Order is Placed
            </div>
            <div className='text-sm mb-4'>
                Plase check your Whatsapp for a Payment link!!
            </div>
            <div className='flex w-full justify-center'>
                <input id="date" name="date" type="date" className="w-64 sm:w-72 pl-2 block rounded-l-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <div className='text-white bg-orange-500 hover:bg-orange-300 py-2 px-4 sm:py-2 sm:px-6 rounded-r-full'>
                    DOB
                </div>
            </div>
            <div className='text-sm my-2'>
                Let us know your birthday and receive something special on your birthday
            </div>
            <div className="my-2 text-sm text-gray-500">
                Not a member? To track your order -
                <Link href="/Signup" className="font-semibold leading-6 text-btn-color hover:text-cyan-400"> Sign Up Now</Link>
            </div>
            <div className=''>
                <Image src='/assets/illustration.svg' alt='' width={450} height={450} />
            </div>
        </div>
    );
}

export default Thankyou;