'use client'
import { useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@context/AuthContext';

const Card = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    }, { threshold: 0.5 }); // adjust the threshold value according to your needs

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    // Still disconnect the observer on component unmount to avoid memory leaks.
    return () => observer.disconnect();
  }, []);

  const { user } = useContext(AuthContext);

  return (
    <div
      ref={cardRef}
      className={`md:w-1/2 z-10 isolate px-4 lg:px-6 transform transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-95'}`}
    >
      <style jsx>{`
        .link:hover {
          background-color: #00b4d8;
          transform: scale(1.05);
        }
      `}</style>
      <div className="mx-auto max-w-2xl py-10 sm:py-10 lg:py-20">
        <div className="text-center">
          <h1 className=" text-3xl text-center lg:text-left font-bold text tracking-tight text-gray-900 sm:text-5xl">
            Elevate Your Learning Experience with
            <span className="text-btn-color"> Student-Friendly Prices </span>
            and
            <span className="text-btn-color"> Expert Assignment Solutions</span>.
          </h1>
          <p className="mt-6 text-lg text-center lg:text-left leading-8 text-gray-600">
            Navigating Excellence: Trusted and Affordable Assignment Help Services.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href={user.userName == '' ? '/Login' : 'Orders/new'} className="link rounded-md bg-btn-color px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-300 ease-in-out hover:bg-cyan-400">
              Place your order now!
            </Link>
            <Link href="#" className="link text-sm font-semibold leading-6 text-gray-900 transition-transform duration-300 ease-in-out">
              Learn more <span onClick = {() => console.log(user)} aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
