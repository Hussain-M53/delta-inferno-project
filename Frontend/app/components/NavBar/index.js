'use client'
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/outline';
import { Fragment, useContext, useEffect, useState } from 'react';
import { AuthContext } from "@context/AuthContext";
import { checkUserAuthentication } from "@utils/auth";



const NavBar = () => {

  const [signedIn, setSignedIn] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);

  const NavBarRoutes = [
    { href: '/', label: 'Home' },
    { href: '/About-Us', label: 'About Us' },
    { href: '/Services', label: 'Services' },
    { href: '/Why-Choose-Us', label: 'Why Choose Us', md: true },
    signedIn ? { href: '/Orders', label: 'Orders', md: true } : null,
    { href: '/Blog', label: 'Blog' },
  ].filter(Boolean);

  useEffect(() => {
    console.log("nav bar useEffect called")
    checkUserAuthentication().then(currentUser => {
      if (currentUser) {
        console.log("From NavBar: User is signed in: ", currentUser);
        setSignedIn(true);
        setUser({
          "userName": currentUser.displayName,
          "email": currentUser.email,
        });
      } else {
        setSignedIn(false);
        console.log("From NavBar: No user is signed in.");
      }
    });

  }, [signedIn])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const bgColor = scrolled ? 'lg:bg-black' : 'lg:transparent';
  const textColor = scrolled ? 'lg:text-white' : 'lg:text-nav-color';


  return (
    <div className={`z-50 w-full flex h-20 justify-between items-center px-6 ${bgColor} ${textColor} lg:sticky lg:top-0`}>
      <Link href={'/'} className="ml-10">
        <Image
          src="/assests/secondary_logo.svg"
          alt="Logo"
          width={90}
          height={90}
          priority
        />
      </Link>

      <div className={`space-x-4 z-50 hidden sm:flex ${textColor}`}>
        {NavBarRoutes.map((link, idx) => (
          <Link href={link.href} key={idx} className={`relative group border-b-2 border-transparent ${scrolled ? 'hover:border-white' : 'hover:border-black'}  ${link.md ? 'hidden md:block' : ''}`}>
            <span className={`${textColor}`}>{link.label}</span>
            <div className={`absolute inset-x-0 top-7 h-0.5 transform scale-x-0 ${scrolled ? 'bg-white' : 'bg-black'} group-hover:scale-x-100 transition-transform duration-300`} />
          </Link>
        ))}
      </div>

      <div className="flex space-x-4 sm:mr-10">
        <div className={`flex space-x-4 ${textColor}`}>
          {signedIn ? (
            <Button setSignedIn={setSignedIn} text={'Sign Out'} />
          ) : (
            <>
              <Button text={'Log In'} />
              <Button text={'Sign Up'} />
            </>
          )}
        </div>

        <div className="relative sm:hidden">
          <Popover className="relative">
            {({ open, setOpen }) => (
              <>
                <Popover.Button className="p-2">
                  <MenuIcon className="w-6 h-6" />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Panel className={`absolute right-2 top-12 bg-gray-100 shadow-lg p-4 rounded-md w-64 z-10 ${!open && 'hidden'}`}>
                    <div className="flex flex-col space-y-2">
                      {NavBarRoutes.map((link, idx) =>
                      (
                        <Link
                          onClick={() => setOpen(false)}
                          href={link.href}
                          key={idx}
                          className="text-nav-color group border-b-2 border-transparent p-2 rounded-md hover:bg-gray-200"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
