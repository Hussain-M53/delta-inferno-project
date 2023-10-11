import '../styles/globals.css'
import { Roboto } from 'next/font/google'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { AuthProvider } from '@context/AuthContext'
import PopUp from '@components/PopUp'
import { OrderDetailsProvider } from '@context/OrderContext'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'], display: 'swap',
})

export const metadata = {
  title: 'Expert Assignment Nation',
  description: 'Your Expert Content Writer',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={roboto.className}>
      <head>
        <link rel="icon" href="/assests/logo.png" />
      </head>
      <body >
        <AuthProvider>
          <OrderDetailsProvider>
            <PopUp />
            <NavBar />
            {children}
            <Footer />
          </OrderDetailsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
