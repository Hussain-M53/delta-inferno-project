import FloatingCalculator from '../components/FloatingCalculator'

export const metadata = {
    title: 'Services . Expert Assignment Nation',
    description: 'Your Expert Content Writer',
}

export default function Service_Layout({ children }) {

    return (
        <div className='flex justify-center sm:gap-x-2 mx-2'>
            {children}
            <div className='hidden sm:block sm:w-1/3'>
                <FloatingCalculator />
            </div>
        </div>
    )
}
