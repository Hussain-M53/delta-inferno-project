'use client'
import Link from 'next/link'
import React, { useContext } from 'react'
import { logOff } from '../../utils/auth'
import { AuthContext } from '../../context/AuthContext'

const Button = ({ text, setSignedIn }) => {
    const { setUser } = useContext(AuthContext);

    const signOut = async (e) => {
        e.preventDefault();
        const response = await logOff();
        console.log(response)
        if (response) {
            setSignedIn(false);
            setUser({
                'userName': '',
                'email': '',
            });
        }
    }


    const href = text === 'Log In' ? 'Login' : 'Sign Up' ? 'Signup' : null;
    return (
        <Link onClick={text === 'Sign Out' ? (e) => signOut(e) : null} href={href} className="z-10 cursor-pointer">
            <div className={`text-sm  sm:text-base h-10 px-5 py-2 flex justify-center items-center rounded-md font-semibold shadow-sm ${text === 'Log In' ? 'bg-white text-nav-color border-nav-color border hover:bg-btn-color hover:text-white' : 'bg-nav-color text-white  border-2 border-white hover:bg-gray-500'}`}>
                {text}
            </div>
        </Link>
    );
}

export default Button   