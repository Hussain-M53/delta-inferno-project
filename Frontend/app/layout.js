'use client'
import '../styles/globals.css'
// import { Inter } from 'next/font/google'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { AuthProvider } from '@context/AuthContext'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Expert Assignment Nation',
//   description: 'Your Expert Content Writer',
// }

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body >
        <AuthProvider>
          <NavBar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
