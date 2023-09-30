'use client'

import { AuthContext } from '../context/AuthContext'
import { createUser, signInWithGoogle } from '../utils/auth'
import { useContext, useState } from 'react'

// export const metadata = {
//   title: 'Sign Up - EAN',
//   description: 'Built on Next 13',
// }

const Page = () => {
  const [formData, setformData] = useState({
    'userName': '',
    'email': '',
    'password': ''
  })
  const { user, setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = await createUser(formData);
    if (currentUser) {
      alert(`User created sucessfully: ${currentUser}`)
      setUser({
        "userName": currentUser.displayName || 'Hussain',
        "email": currentUser.email,
      });
    }
  }

  const signIn = async (e) => {
    e.preventDefault();
    const currentUser = await signInWithGoogle();
    if (currentUser) {
      alert(`${currentUser.displayName} Logged in using Google sucessfully`)
      setUser({
        "userName": currentUser.displayName,
        "email": currentUser.email,
      });
    }
  }

  const handleChange = (e) => {
    setformData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <div className="-mt-10 flex min-h-screen flex-col justify-center px-6 lg:px-8 sm:mx-auto sm:max-w-lg">
      <h2 className="mb-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for your account</h2>
      <form className="space-y-6" action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
          <div className="mt-2">
            <input id="userName" name="userName" type="text" onChange={handleChange} value={formData.userName} autoComplete="current-userName" required className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input id="email" name="email" type="email" onChange={handleChange} value={formData.email} autoComplete="email" required className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="mt-2">
            <input id="password" name="password" type="password" onChange={handleChange} value={formData.password} autoComplete="current-password" required className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-btn-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-cyan-400">Sign Up</button>
        </div>
      </form>

      <div className="my-3 border-b border-gray-200" />
      <div>
        <button type="submit" onClick={(e) => signIn(e)} className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Sign Up With Google</button>
      </div>
    </div>
  )
}

export default Page