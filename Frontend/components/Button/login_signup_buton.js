import Link from 'next/link'
import React, { useContext } from 'react'
import { logOff } from '../../utils/auth'
import { AuthContext } from '../../context/AuthContext'

const Button = ({ text }) => {
    const { setUser } = useContext(AuthContext);
    const signOut = async (e) => {
        e.preventDefault();
        if (text === 'Sign Out') {
            const response = await logOff();
            if (response) {
                setUser({
                    'userName': '',
                    'email': '',
                    'password': ''
                });
            }
        }
    }


    return (
        <Link href={`${text === 'Log In' ? 'Login' : 'Signup'}`} className="z-10">
            <button onClick={(e) => signOut(e)} className={`h-10 px-5 py-2 flex justify-center items-center rounded-md font-semibold shadow-sm  ${text === 'Log In' ? 'bg-white text-nav-color border-nav-color border hover:bg-btn-color hover:text-white' : 'bg-nav-color text-white border-nav-color border hover:bg-gray-500'}`}>
                {text}
            </button>
        </Link>
    )
}

export default Button   