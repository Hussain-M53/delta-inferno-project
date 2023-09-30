
import Hero from './components/HeroBanner'
import ReviewCard from './components/ReviewCard'
import FAQ from './components/FAQ'
import FeaturedCourses from './components/featured'
import CTA from './components/CTA'
import TestimonialCard from './components/TestimonialCard'
import WhyChooseUs from './components/Why-Choose-Us-Section'

export default function Home() {
  return (
    <main className="space-y-40">
      {/* Hero Section */}
      <Hero />
      {/* Reviews Section*/}
      <ReviewCard />
      {/* Why Choose Us section */}
      <WhyChooseUs />
      {/* Testimonials Section*/}
      <TestimonialCard />
      {/* Order Placing CTA Section */}
      <CTA />
      {/* Our Services Section */}
      <FeaturedCourses />
      {/* FAQ Section */}
      <FAQ />

    </main>
  )
}
