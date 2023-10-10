'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { fetchData } from '@utils/CMS_Retreival';

const Card = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef();
  const [content, setContent] = useState({});

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


  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchData('heroSection');
        if (data && data.result && data.result.length > 0) {
          setContent({
            'title': data.result[0].title,
            'subTitle': data.result[0].subTitle,
            'buttonText': data.result[0].buttonText,
          });
        }
      } catch (error) {
        console.error('Error fetching and setting data:', error);
      }
    };

    fetchDataAndSetState();
  }, []);


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
      <div className="mx-auto max-w-2xl py-10 lg:py-20">
        <div className="text-center">
          <h1 className=" text-3xl text-center lg:text-left font-bold text tracking-tight text-gray-900 sm:text-5xl">
          {content.title?.split(' ').slice(0, 5).join(' ')}
            <span className="text-btn-color"> {content.title?.split(' ').slice(5, 7).join(' ')} </span>
            {content.title?.split(' ').slice(7, 8).join(' ')}
            <span className="text-btn-color"> {content.title?.split(' ').slice(8).join(' ')}</span>.
          </h1>
          <p className="mt-6 text-lg text-center lg:text-left leading-8 text-gray-600">
            {content.subTitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href={'Orders/new'} className="link rounded-md bg-btn-color px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-300 ease-in-out hover:bg-cyan-400">
             {content.buttonText}
            </Link>
            <Link href="/Signup" className="hover:text-red-600 link text-sm font-semibold leading-6 text-gray-900 transition-transform duration-300 ease-in-out">
              Sign-up Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
