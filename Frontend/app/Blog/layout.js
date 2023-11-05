import FloatingCalculator from '../components/FloatingCalculator'

export const metadata = {
    title: 'Blog . Expert Assignment Nation',
    description: 'Your Expert Content Writer',
}

export default function BlogLayout({ children }) {

    return (
        <div className='flex justify-center gap-x-2 mx-2'>
            {children}
            <div className = 'hidden sm:block sm:w-1/3'>
                <FloatingCalculator />
            </div>
        </div>
    )
}
