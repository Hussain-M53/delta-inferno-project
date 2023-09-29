'use client'

import Hero from '../components/HeroBanner'
import ReviewCard from '../components/ReviewCard'
import FAQ from '../components/FAQ'
import FeaturedCourses from '../components/featured'
import CTA from '../components/CTA'
import TestimonialCard from '../components/TestimonialCard'


export default function Home() {
  return (
    <main className="">
      <div className="">
        {/* Hero Section */}
        <Hero />
        {/* Reviews Section*/}
          <ReviewCard />
        {/* Why Choose Us section */}
        <FeaturedCourses/>
        {/* Testimonials Section
        {/* Order Placing CTA Section */}
        <div className='flex mx-4'>
        <TestimonialCard/>
        <TestimonialCard/>
        </div>
        <CTA/>
        {/* Our Services Section */}
        {/* FAQ Section */}
        <FAQ />
       
      </div>
    </main>
  )
}
