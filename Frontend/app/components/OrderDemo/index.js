'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

const OrderDemo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    }, { threshold: 0.5 });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);


  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 md:h-[500px]"> {/* <-- Set specific height here */}
      <div className="p-10 relative isolate overflow-hidden bg-gray-900 shadow-2xl sm:rounded-3xl md:flex md:gap-x-20 md:px-24 h-full">
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:ml-80 lg:left-1/4 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          aria-hidden="true"
        >
          <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
              <stop stopColor="#3C3A3B" />
              <stop offset={1} stopColor="#0E78B9" />
            </radialGradient>
          </defs>
        </svg>

        <div ref={cardRef} className={`m-auto max-w-md text-center md:flex-auto md:text-left transform transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-95'}`}>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Boost your productivity.
            <br />
            Start using our services today.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 md::justify-start">
            <Link
              href="#"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Place Order Now
            </Link>
            <Link href="#" className="text-sm font-semibold leading-6 text-white">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div
          ref={cardRef}
          className={`mt-6 w-full md:m-auto h-full transform transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'}`}>
          <iframe
            className="object-cover w-full h-full"
            src="https://www.youtube.com/embed/KJwYBJMSbPI?autoplay=1&mute=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default OrderDemo