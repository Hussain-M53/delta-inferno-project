'use client'
import { useEffect, useRef, useState } from 'react';
import { ThumbUpIcon, ClockIcon, StatusOnlineIcon, FingerPrintIcon } from '@heroicons/react/outline';
import Image from "next/image";
import { fetchData } from '@utils/CMS_Retreival';



const PromoCard = ({ item, index, isVisible, icon }) => {
  return (
    <div className={`flex flex-col items-center hover:bg-cyan-100 hover:shadow-md space-y-2 border-2 rounded-lg border-gray-300 p-6 transition-all delay-${index * 100} duration-500 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className='font-bold text-center'>{item.title}</div>
      {item.icon ? <Image src={`${element.icon}`} height={40} width={40} /> : <div className="mb-4">{icon}</div>}
      <div className='text-center text-sm'>{item.description}</div>
    </div>
  );
};



const WhyChooseUs = () => {

  const icons = [
    <ClockIcon height={40} color='#0E78B9' />,
    <StatusOnlineIcon height={40} color='#0E78B9' />,
    <FingerPrintIcon height={40} color='#0E78B9' />,
    <ThumbUpIcon height={40} color='#0E78B9' />,
  ];

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();
  const [cardDetails, setCardDetails] = useState([{}]);

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

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchData('whyChooseUs');
        if (data && data.result && data.result.length > 0) {
          setCardDetails(data.result.map((item) => ({
            'title': item.title,
            'icon': item.icon,
            'description': item.description,
          })
          ))
        }
      }
      catch (error) {
        console.error('Error fetching and setting data:', error);
      }
    };

    fetchDataAndSetState();
  });

  return (
    <div className="min-h-fit" ref={ref}>
      <div className='relative' >
        <Image src='assests/shape_142.svg' width={70} height={70} className='absolute right-2 sm:right-20 md:right-40 lg:right-80 -top-8' />
        <h1 className="font-bold mb-4 text-center text-4xl">Why Choose Us</h1>
        <p className="text-center text-2xl">Smashing Stress, Unleashing Success: Welcome to the Assignment Wonderland!</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mx-8 justify-center mt-12'>
        {
          cardDetails.map((item, idx) => (
            <PromoCard key={idx} index={idx} item={item} icon={icons[idx % icons.length]} isVisible={isVisible} />
          ))
        }
      </div>
    </div>
  );
};

export default WhyChooseUs;
