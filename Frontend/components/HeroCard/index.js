import Link from "next/link"

const Card = () => {
  return (
      <div className=" md:w-1/2 z-10 isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-10 sm:py-10 lg:py-20">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{' '}
              <Link href="#" className="font-semibold text-btn-color">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl text-left font-bold tracking-tight text-gray-900 sm:text-6xl">
            Embrace all aspects of student life
            </h1>
            <p className="mt-6 text-lg text-left  leading-8 text-gray-600">
            Just ask, "write an essay for me." We'll alleviate your academic worries by connecting you with an expert writer.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="#"
                className="rounded-md bg-btn-color px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Order Now
              </Link>
              <Link href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        
      </div>
  )
}

export default Card