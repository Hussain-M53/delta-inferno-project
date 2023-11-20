import FloatingCalculator from '../components/FloatingCalculator'

export const metadata = {
    title: 'Blog . Expert Assignment Nation',
    description: 'Your Expert Content Writer',
}

export default function BlogLayout({ children }) {

    return (
        <div className='flex flex-col sm:flex-row justify-center gap-2 mx-2'>
            <div className='sm:w-1/3 sm:order-2 sm:block'>
                <FloatingCalculator />
                <div className='hidden sm:mt-4 sm:h-screen sm:block bg-orange-500'>
                </div>
            </div>
            <div className='w-full sm:order-1'>
                {children}
            </div>
        </div>
    )
}
