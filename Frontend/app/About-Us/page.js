
export const metadata = {
  title: 'About Us - EAN',
  description: 'Built on Next 13',
}

const section = [
  {
    title: 'Affordable Rates',
    desc: 'We offer budget-friendly academic prices without compromising on quality.'
  },
  {
    title: 'Guaranteed Quality',
    desc: 'Our commitment is to your satisfaction, and we provide academic content revisions to meet your expectations.'
  },
  {
    title: 'On-Time Delivery',
    desc: 'Join the ranks of satisfied students who trust our dependable service for on-time assignment delivery, ensuring your academic success.'
  }
]

const Page = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-[#3C3A3B] mb-8">About Us - Your Trusted Academic Partner</h1>
      <p>Welcome to <span className="text-[#31C1D4] font-semibold">Expert Assignment Nation</span>, your trusted academic partner in the UK. We are a group of dedicated students who established this service to address the unique academic challenges faced by fellow students.</p>

      <div className="mt-12">
        <h2 className="text-3xl font-bold text-[#3C3A3B] mb-6">Our Journey</h2>
        <p>Our journey began with the recognition of the numerous academic difficulties that students encounter during their educational pursuits. From intricate assignments to demanding exams and the pursuit of work-life balance, we empathize with the academic challenges that students grapple with on a daily basis.</p>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold text-[#3C3A3B] mb-6">Founded by Students, for Students</h2>
        <p>Expert Assignment Nation was founded with a clear objective: to offer comprehensive and reliable academic support to fellow students. Our goal is to ensure that every student can thrive in their educational journey without becoming overwhelmed.</p>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold text-[#3C3A3B] mb-6">Our Mission</h2>
        <p>Our mission is two-fold: to provide top-quality academic assistance and to nurture a sense of community among students. With a dedicated team of expert writers, we deliver assignment help, dissertation writing services, and essay writing assistance, all designed to meet the highest academic standards in the UK.</p>
      </div>

      <div className="mt-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Us?
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-2 gap-y-10 lg:max-w-none sm:grid-cols-3 sm:gap-y-16">
            {
              section.map((item, idx) =>
              (
                <div key={idx} className="relative pl-4">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    {item.title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{item.desc}</dd>
                </div>
              ))
            }
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Page