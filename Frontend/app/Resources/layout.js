import FloatingCalculator from '../components/FloatingCalculator'

export const metadata = {
    title: 'Resources . Expert Assignment Nation',
    description: 'Your Expert Content Writer',
}

export default function ResourceLayout({ children }) {

    return (
        <div className='flex flex-col sm:flex-row justify-center gap-2 mx-2'>
            <div className='sm:w-1/3 sm:order-2'>
                <FloatingCalculator />
            </div>
            <div className='w-full sm:order-1'>
                {children}
            </div>
        </div>
    )
}
