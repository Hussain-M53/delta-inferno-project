'use client'

import Hero from '../components/HeroBanner'
import Footer from '../components/Footer'
import ReviewCard from '../components/ReviewCard'
import FAQ from '../components/FAQ'
import FeaturedCourses from '../components/featured'


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
        {/* Our Services Section */}
        {/* FAQ Section */}
        <FAQ />
       
      </div>
    </main>
  )
}
