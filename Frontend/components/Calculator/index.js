
const Calculator = () => {

  const getPrice = (e) => {
    e.preventDefault();
  }


  return (
    <form className='z-10 md:w-1/2 border-2 border-gray-100 rounded-3xl m-10 max-h-calc[h-screen] hover:shadow-sm'>
      <div className="mt-10 px-20">
        <div className="border-b border-gray-900/10 pb-6">
          <h2 className="text-3xl font-bold tracking-tight text-center leading-7 text-gray-900 sm:text-5xl  ">Get a Price Quote</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>

        <div className=" border-b border-gray-900/10 pb-6">
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="mt-2 sm:col-span-3">
              <select
                id="AcademicLevel"
                name="AcademicLevel"
                defaultValue={"Academic Level"}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {/* <option value="" disabled selected style={{ display: 'none' }}>Academic Level</option> */}
                <option>School</option>
                <option>College</option>
                <option>Under Grad</option>
              </select>
            </div>

            <div className="mt-2 sm:col-span-3">
              <select
                id="TypeOfService"
                name="TypeOfService"
                defaultValue={"Type of Service"}
                className=" pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {/* <option value="" disabled selected style={{ display: 'none' }}>Type of Service</option> */}
                <option>Re-writing</option>
                <option>Content writing</option>
                <option>Creative writing</option>
              </select>
            </div>

            <div className="mt-2 sm:col-span-3">
              <select
                id="TypeOfPaper"
                name="TypeOfPaper"
                defaultValue={"Type of Paper"}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {/* <option value="" disabled selected style={{ display: 'none' }}>Type of Paper</option> */}
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>

            <div className="mt-2 sm:col-span-3">
              <select
                id="Subject"
                name="Subject"
                defaultValue={"Subject"}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {/* <option value="" disabled selected style={{ display: 'none' }}>Subject</option> */}
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>

            <div className="mt-2 sm:col-span-3 sm:col-start-1">
              <select
                id="WordLimit"
                name="WordLimit"
                defaultValue={"Word Limit"}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {/* <option value="" disabled selected style={{ display: 'none' }}>Word Limit</option> */}
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>

            <div className="mt-2 sm:col-span-3">
              <select
                id="Deadline"
                name="Deadline"
                defaultValue={"Deadline"}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {/* <option value="" disabled selected style={{ display: 'none' }}>Deadline</option> */}
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>

          </div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-x-6">
          <h1 className='font-bold text-2xl'>$20</h1>
          <button
            type="submit"
            onClick={(e) => getPrice(e)}
            className="rounded-md bg-btn-color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Calculate Price
          </button>
        </div>

      </div>

    </form>
  )
}

export default Calculator