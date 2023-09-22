'use client'

import '../styles/globals.css'
// import { Inter } from 'next/font/google'
import NavBar from '../components/NavBar'
import { AuthProvider } from '../context/AuthContext'
import Footer from '../components/Footer'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Delta Inferno',
  description: 'Built on Next 13',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body >
          <NavBar />
          {children}
        <Footer />
        </body>
      </AuthProvider>
    </html>
  )
}
