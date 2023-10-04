'use client'
import { useEffect, useRef, useState } from 'react';
import { ThumbUpIcon, ClockIcon, StatusOnlineIcon, FingerPrintIcon } from '@heroicons/react/outline';
import Image from "next/image";

const cardDetails = [
  {
    'title': 'TIMELY DELIVERY',
    'icon': <ClockIcon height={40} color='#0E78B9' />,
    'desc': 'Our writers are dedicated to delivering the best service possible in as little as 3 hours.',
  },
  {
    'title': 'SUPPORT AVAILABLE 24/7',
    'icon': <StatusOnlineIcon height={40} color='#0E78B9' />,
    'desc': 'Our online assignment help team is always here for you. Get assistance when you need it.',
  },
  {
    'title': 'PRIVACY & SECURITY GUARANTEED',
    'icon': <FingerPrintIcon height={40} color='#0E78B9' />,
    'desc': 'We value your confidentiality, so we work with 256 bit SSL encrypted service, and our privacy policy is very strict',
  },
  {
    'title': 'ORIGINAL CONTENT ONLY',
    'icon': <ThumbUpIcon height={40} color='#0E78B9' />,
    'desc': 'We do not tolerate plagiarism that is why we check every paper for originality.',
  }, {
    'title': 'TIMELY DELIVERY',
    'icon': <ClockIcon height={40} color='#0E78B9' />,
    'desc': 'Our writers are dedicated to delivering the best service possible in as little as 3 hours.',
  },
  {
    'title': 'SUPPORT AVAILABLE 24/7',
    'icon': <StatusOnlineIcon height={40} color='#0E78B9' />,
    'desc': 'Our online assignment help team is always here for you. Get assistance when you need it.',
  },
  {
    'title': 'PRIVACY & SECURITY GUARANTEED',
    'icon': <FingerPrintIcon height={40} color='#0E78B9' />,
    'desc': 'We value your confidentiality, so we work with 256 bit SSL encrypted service, and our privacy policy is very strict',
  },
  {
    'title': 'ORIGINAL CONTENT ONLY',
    'icon': <ThumbUpIcon height={40} color='#0E78B9' />,
    'desc': 'We do not tolerate plagiarism that is why we check every paper for originality.',
  },
];


const PromoCard = ({ item, index, isVisible }) => {
  return (
    <div className={`flex flex-col items-center hover:bg-gray-100 hover:shadow-md space-y-2 border-2 rounded-lg border-gray-300 p-6 transition-all delay-${index * 100} duration-500 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className='font-bold text-center'>{item.title}</div>
      <div className='text-center'>{item.icon}</div>
      <div className='text-center text-sm'>{item.desc}</div>
    </div>
  );
};



const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref]);

  return (
    <div className="min-h-fit" ref={ref}>
      <div className='relative' >
        <Image src='assests/shape_142.svg' width={70} height={70} className='absolute right-60 top-0' />
        <h1 className="font-bold mb-4 text-center text-4xl">Why Choose Us</h1>
        <p className="text-center text-2xl">Smashing Stress, Unleashing Success: Welcome to the Assignment Wonderland!</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mx-8 justify-center mt-12'>
        {
          cardDetails.map((item, idx) => (
            <PromoCard key={idx} index={idx} item={item} isVisible={isVisible} />
          ))
        }
      </div>
    </div>
  );
};

export default WhyChooseUs;
