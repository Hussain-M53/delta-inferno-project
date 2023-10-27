import Image from 'next/image';

const Thankyou = () => {
    return (
        <div className='h-screen flex flex-col items-center mt-4 gap-y-4'>
            <div className='font-bold text-3xl'>
                Congratutions!!! Your Order is Placed
            </div>
            <div>
                Plase check your Whatsapp for a Payment link!!
            </div>
            <div className='flex'>
                <input id="date" name="date" type="date" className="w-80 pl-2 block rounded-l-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <div className='bg-orange-500 py-2 px-4 rounded-r-full'>
                    DOB
                </div>
            </div>
            <div>
                Let us know your birthday and receive something special on your birthday
            </div>
            <div>
                <Image src='' alt='' />
            </div>
        </div>
    );
}

export default Thankyou;