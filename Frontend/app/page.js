
import Hero from './components/HeroBanner'
import ReviewCard from './components/ReviewCard'
import FAQ from './components/FAQ'
import FeaturedCourses from './components/featured'
import CTA from './components/CTA'
import TestimonialCard from './components/TestimonialCard'
import WhyChooseUs from './components/Why-Choose-Us-Section'

export default function Home() {
  return (
    <main className="space-y-10 overflow-x-hidden">
      {/* Hero Section */}
      <Hero />
      {/* Reviews Section*/}
      <div
        className="absolute -z-10 inset-x-0 transform-gpu overflow-hidden blur-3xl sm:top-700"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-4rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#31C1D4] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <ReviewCard />

      {/* Why Choose Us section */}
      <WhyChooseUs />
      {/* Testimonials Section*/}
      <TestimonialCard />
      {/* Order Placing CTA Section */}
      <CTA />
      <div
        className="-z-10 absolute inset-x-0 top-[calc(100%-5rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(400%)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#31C1D4] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      {/* Our Services Section */}
      <FeaturedCourses />
      {/* FAQ Section */}
      <FAQ />

    </main>
  )
}
