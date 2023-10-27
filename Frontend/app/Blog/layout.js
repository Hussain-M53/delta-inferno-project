import FloatingCalculator from '../components/FloatingCalculator'

export const metadata = {
    title: 'Blog . Expert Assignment Nation',
    description: 'Your Expert Content Writer',
}

export default function BlogLayout({ children }) {

    return (
        <div className='relative'>
            <div className='absolute right-0 top-2'>
                <FloatingCalculator />
            </div>
            {children}
        </div>
    )
}
