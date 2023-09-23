'use client'

import Hero from '../components/HeroBanner'
import ReviewCard from '../components/ReviewCard'
import FAQ from '../components/FAQ'
import FeaturedCourses from '../components/featured'
import CTA from '../components/CTA'


export default function Home() {
  return (
    <main className="">
      <div className="">
        {/* Hero Section */}
        <Hero />
        {/* Reviews Section*/}
        <div className="flex justify-center items-center">
          <ReviewCard />
        </div>
        {/* Why Choose Us section */}
        <FeaturedCourses/>
        {/* Testimonials Section */}
        {/* Order Placing CTA Section */}
        <CTA/>
        {/* Our Services Section */}
        {/* FAQ Section */}
        <FAQ />
       
      </div>
    </main>
  )
}
