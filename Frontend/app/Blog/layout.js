
import { PostProvider } from '@context/PostContext'

export const metadata = {
    title: 'Blog . Expert Assignment Nation',
    description: 'Your Expert Content Writer',
}

export default function BlogLayout({ children }) {

    return (
        <PostProvider>
            {children}
        </PostProvider>
    )
}
