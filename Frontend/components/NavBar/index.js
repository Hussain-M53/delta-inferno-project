import Image from "next/image";
import Link from "next/link";
import Button from "../Button/login_signup_buton";
import { Popover, Transition } from '@headlessui/react';
// import { MenuIcon } from '@heroicons/react/outline';
import {Fragment} from 'react';

const NavBar = ({ signedIn }) => {
  const NavBarRoutes = [
    { href: '/', label: 'Home' },
    { href: '/About-Us', label: 'About Us' },
    { href: '/Services', label: 'Services' },
    { href: '/Why-Choose-Us', label: 'Why Choose Us', md: true },
    // signedIn ? { href: '/Orders', label: 'Orders', md: true } : null,
    { href: '/Blog', label: 'Blog' },
  ]

  return (
    <div className='z-10 w-full flex h-20 bg-bg-color justify-between items-center px-2 sm:px-6'>
      <Link href={'/'} className="ml-10">
        <Image
          src="/assests/secondary_logo.svg"
          alt="Logo"
          width={90}
          height={90}
          priority
        />
      </Link>

      <div className="space-x-4 z-10 hidden sm:flex">
        {NavBarRoutes.map((link, idx) => (
          <Link href={link.href} key={idx} className={`relative text-nav-color  group border-b-2 border-transparent hover:border-nav-color ${link.md ? 'hidden md:block' : ''}`}>
            {link.label}
            <div className="absolute inset-x-0 top-7 h-0.5 transform scale-x-0 bg-nav-color group-hover:scale-x-100 transition-transform duration-300" />
          </Link>
        ))}
      </div>


      <div className="flex space-x-4 sm:mr-10 ">
        {
          signedIn === true ? <Button text={'Sign Out'} /> :
            <>
              <Button text={'Log In'} />
              <Button text={'Sign Up'} />
            </>
        }
      </div>
      <div className="relative sm:hidden">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className="p-2">
                {/* <MenuIcon className="w-6 h-6" /> */}***
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
  );
}

export default NavBar;
