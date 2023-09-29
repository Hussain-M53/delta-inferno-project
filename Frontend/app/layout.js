'use client'

import '../styles/globals.css'
// import { Inter } from 'next/font/google'
import NavBar from '../components/NavBar'
import { AuthProvider } from '../context/AuthContext'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { checkUserAuthentication } from '../utils/auth'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Expert Assignment Nation',
  description: 'Your Expert Content Writer',
}

export default function RootLayout({ children }) {

  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    console.log('first')
    checkUserAuthentication().then(user => {
      if (user) {
        console.log("User is signed in: ", user);
        setSignedIn(true);
      } else {
        setSignedIn(false);
        console.log("No user is signed in.");
      }
    });
  }, [])

  return (
    <html lang="en">
      <AuthProvider>
        <body >
          <NavBar signedIn={signedIn} />
          {children}
          <Footer />
        </body>
      </AuthProvider>
    </html>
  )
}
