import FloatingCalculator from '../components/FloatingCalculator'

export const metadata = {
    title: 'Services . Expert Assignment Nation',
    description: 'Your Expert Content Writer',
}

export default function Service_Layout({ children }) {

    return (
        <div className='flex justify-center gap-x-4 mx-2'>
            {children}
            <div className='hidden sm:block'>
                <FloatingCalculator />
            </div>
        </div>
    )
}
