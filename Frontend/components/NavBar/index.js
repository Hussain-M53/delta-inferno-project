import Image from "next/image";
import Link from "next/link";
import Button from "../Button/login_signup_buton";
import { checkUserAuthentication } from '../../utils/auth'
import { useEffect, useState } from "react";

const NavBar = () => {

  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(checkUserAuthentication());
  }, [])

  return (
    <div className=' w-full flex h-20 bg-bg-color justify-between items-center px-6'>
      <Link href={'/'} className="ml-10">
        <Image
          src="/assests/secondary_logo.svg"
          alt="Logo"
          width={90}
          height={90}
          priority
        />
      </Link>

      <div className="flex space-x-4 z-10">
        {[
          { href: '/', label: 'Home' },
          { href: '/About-Us', label: 'About Us' },
          { href: '/Services', label: 'Services' },
          { href: '/Why-Choose-Us', label: 'Why Choose Us', md: true },
          // signedIn && { href: '/Orders', label: 'Orders', md: true },
          { href: '/Blog', label: 'Blog' },

        ].map((link) => (
          <Link href={link.href} key={link.label} className={`relative text-nav-color  group border-b-2 border-transparent hover:border-nav-color ${link.md ? 'hidden md:block' : ''}`}>
            {link.label}
            <div className="absolute inset-x-0 top-7 h-0.5 transform scale-x-0 bg-nav-color group-hover:scale-x-100 transition-transform duration-300" />
          </Link>
        ))}
      </div>


      <div className="flex space-x-4 mr-10 ">
        {
          signedIn == true ? <Button text={'Sign Out'} /> :
            <>
              <Button text={'Log In'} />
              <Button text={'Sign Up'} />
            </>
        }
      </div>
    </div>
  );
}

export default NavBar;
