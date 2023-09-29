import Link from "next/link"

const Card = () => {
  return (
    <div className=" md:w-1/2 z-10 isolate px-4 lg:px-6">
      <div className="mx-auto max-w-2xl py-10 sm:py-10 lg:py-20">
        <div className="text-center">
          <h1 className=" text-3xl text-center lg:text-left font-bold text tracking-tight text-gray-900 sm:text-5xl">
            Elevate Your Learning Experience with
            <span className="text-btn-color"> Student-Friendly Prices </span>
            and
            <span className="text-btn-color"> Expert Assignment Solutions</span>.
          </h1>
          <p className="mt-6 text-lg text-center lg:text-left leading-8 text-gray-600">
            Navigating Excellence: Trusted and Affordable Assignment Help Services.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="#"
              className="rounded-md bg-btn-color px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get an Instant Quote
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