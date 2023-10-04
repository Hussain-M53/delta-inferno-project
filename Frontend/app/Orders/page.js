'use client'

// export const metadata = {
//   title: 'Orders',
//   description: 'Built on Next 13',
// }

import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react'

const Page = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user.userName == '') {
      router.push('/Login');
    }

  }, [])
  return (
    <div>{user.userName ? "user" : 'no user'}</div>
  )
}

export default Page

