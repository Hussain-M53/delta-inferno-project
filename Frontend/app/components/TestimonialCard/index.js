'use client'

import { fetchData } from '@utils/CMS_Retreival';
import Image from 'next/image';
import { useEffect, useState,useRef } from 'react';


const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const testRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    }, { threshold: 0.5 });

    if (testRef.current) {
      observer.observe(testRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchData('testimonial');
        if (data && data.result && data.result.length > 0) {
          setTestimonials(data.result.map((item) => ({
            'title': item.title,
            'icon': item.icon,
            'description': item.description,
            'name': item.name,
            'country': item.country,
          }))
          )
        }
      } catch (error) {
        console.error('Error fetching and setting data:', error);
      }
    };

    fetchDataAndSetState();
  }, []);

  return (
    <section className="w-full relative bg-transparent px-4 lg:px-8">
      <h1 className="font-bold text-center text-4xl md:text-5xl">
        What's our client Says About us.
      </h1>
      {/* <Image src='/assests/bg-18.png' width={1000}
        height={100}
        alt="" className="absolute -z-10  top-32 " /> */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-transparent shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div ref={testRef}
        className={`transition-all transform duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        <div className="mx-auto flex overflow-x-auto scrollbar-hide whitespace-wrap ">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 mt-10 mx-2 px-6 py-4 border-2 border-gray-300 rounded-xl hover:bg-cyan-50">
              <div className="my-8">
                <div className="mt-4 flex flex-col items-center  space-x-3 text-base">
                  <div className="font-bold mb-2 text-3xl text-gray-900">{testimonial.title}</div>
                  <div className="text-gray-600 text-xl">⭐️⭐️⭐️⭐️</div>
                  <div className="mt-4 text-center text-md font-medium leading-8 text-gray-500 sm:text-lg sm:leading-9">
                    {testimonial.description}
                  </div>
                </div>
              </div>
              <div className="my-6 mx-6 flex items-center justify-between gap-x-4">
                <div className="text-sm leading-6 font-semibold text-gray-900">
                  <p>  {testimonial.name}, <span className="text-gray-400"> {testimonial.country}</span></p>
                </div>
                <Image src={`${testimonial.icon ? testimonial.icon : "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}`}
                  width={10}
                  height={10}
                  alt="" className="h-10 w-10 rounded-full bg-gray-50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

<style jsx global>{`
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }
`}</style>

