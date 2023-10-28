import Image from 'next/image';

const Thankyou = () => {
    return (
        <div className='relative h-fit flex flex-col items-center py-8 gap-y-4'>
            <div className='absolute w-full top-10 right-0 left-0'>
                <Image src='/assets/Shapes.svg'  width={1200} height={200}/>
            </div>
            <div className='font-bold text-3xl'>
                Congratutions!!! Your Order is Placed
            </div>
            <div className='text-sm mb-4'>
                Plase check your Whatsapp for a Payment link!!
            </div>
            <div className='flex'>
                <input id="date" name="date" type="date" className="w-80 pl-2 block rounded-l-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <div className='text-white bg-orange-500 hover:bg-orange-300 py-2 px-6 rounded-r-full'>
                    DOB
                </div>
            </div>
            <div className='text-sm my-2'>
                Let us know your birthday and receive something special on your birthday
            </div>
            <div className=''>
                <Image src='/assets/illustration.svg' alt='' width={450} height={450}/>
            </div>
        </div>
    );
}

export default Thankyou;