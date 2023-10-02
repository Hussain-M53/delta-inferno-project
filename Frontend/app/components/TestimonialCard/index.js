'use client'

import Image from 'next/image';
import React from 'react';

const testimonials = [
  {
    rating: 'Very Solid!',
    star: '⭐️⭐️⭐️',
    text: '“Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.”',
    author: 'Judith Black',
  }, {
    rating: 'On Time Delivery!',
    star: '⭐️⭐️⭐️⭐️⭐️',
    text: '“Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.”',
    author: 'Judith Black',
  },
  //... add more testimonials as needed.
];

const Testimonials = () => {
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-20 lg:px-8 border-b">
      <h1 className="font-bold text-center text-4xl ">
        What's our client Says About us.
      </h1>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

      <div className="mx-auto md:flex max-w-2xl lg:max-w-6xl">

        {testimonials.map((testimonial, idx) => (
          <figure key={idx} className="mt-10 mx-10">
            <figcaption className="my-8">
              <div className="mt-4 flex flex-col items-center justify-center space-x-3 text-base">
                <div className="font-bold mb-2 text-3xl text-gray-900">{testimonial.rating}</div>
                <div className="text-gray-600 text-xl">{testimonial.star}</div>
              </div>
            </figcaption>
            <blockquote className="text-center text-md font-medium leading-8 text-gray-900 sm:text-lg sm:leading-9">
              <p>{testimonial.text}</p>
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
