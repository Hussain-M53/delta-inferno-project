import { useState } from 'react'

const Calculator = () => {

  const [typeOfService, setTypeOfService] = useState('Type of Service');
  const [typeOfPaper, setTypeOfPaper] = useState('Type of Paper');
  const [subject, setSubject] = useState('Subject');
  const [academicLevel, setAcademicLevel] = useState('Academic Level');
  const [wordLimit, setwordLimit] = useState('Word Limit');
  const [deadline, setdeadline] = useState('Deadline');

  const serviceOptions = {
    'Writing': ['Essay', 'Research Paper'],
    'Editing': ['Article', 'Blog Post'],
    'Proof Reading': ['Poem', 'Short Story']
  };

  const paperOptions = {
    'Essay': ['Literature', 'History'],
    'Research Paper': ['Physics', 'Chemistry'],
    'Article': ['Technology', 'Health'],
    'Blog Post': ['Lifestyle', 'Travel'],
    'Poem': ['Romantic', 'Reflective'],
    'Short Story': ['Fantasy', 'Drama']
  };

  const getTypeOfPaperOptions = () => {
    if (typeOfService === 'Type of Service') return [];
    return serviceOptions[typeOfService] || [];
  }

  const getSubjectOptions = () => {
    if (typeOfPaper === 'Type of Paper') return [];
    return paperOptions[typeOfPaper] || [];
  }

  const handleTypeOfServiceChange = (e) => {
    setTypeOfService(e.target.value);
    setTypeOfPaper('Type of Paper');  // Reset child dropdown to default
    setSubject('Subject');            // Reset the next child dropdown as well
  }

  const handleTypeOfPaperChange = (e) => {
    setTypeOfPaper(e.target.value);
    setSubject('Subject');            // Reset child dropdown to default
  }
  const getPrice = (e) => {
    e.preventDefault()
    const prompt = {
      'Academic Level': academicLevel,
      'Type of Service': typeOfService,
      'Type of Paper': typeOfPaper,
      'Word Limit': wordLimit,
      'Deadline': deadline,
    }
    console.log(prompt)
  }

  return (
    <form className='px-20 z-10 md:w-1/2 border-2 border-gray-100 rounded-3xl m-10 max-h-fit py-12 hover:shadow-sm'>
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
              onChange={(e) => setAcademicLevel(e.target.value)}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option disabled selected style={{ display: 'none' }}>Academic Level</option>
              <option>School</option>
              <option>College</option>
              <option>Under Grad</option>
            </select>
          </div>

          <div className="mt-2 sm:col-span-3">
            <select
              id="TypeOfService"
              name="TypeOfService"
              value={typeOfService}
              onChange={(e) => handleTypeOfServiceChange(e)}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="" disabled>Type Of Services</option>
              {Object.keys(serviceOptions).map((service) => <option key={service}>{service}</option>)}
            </select>
          </div>

          <div className="mt-2 sm:col-span-3">
            <select
              id="TypeOfPaper"
              name="TypeOfPaper"
              value={typeOfPaper}
              onChange={(e) => handleTypeOfPaperChange(e)}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="" disabled>Type of Paper</option>
              {getTypeOfPaperOptions().map((paper) => <option key={paper}>{paper}</option>)}
            </select>
          </div>

          <div className="mt-2 sm:col-span-3">
            <select
              id="Subject"
              name="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="" disabled>Subject</option>
              {getSubjectOptions().map((subj) => <option key={subj}>{subj}</option>)}
            </select>
          </div>

          <div className="mt-2 sm:col-span-3 sm:col-start-1">
            <select
              id="WordLimit"
              name="WordLimit"
              onChange={(e) => setwordLimit(e.target.value)}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option disabled selected style={{ display: 'none' }}>Word Limit</option>
              <option>500 - 1000 words</option>
              <option>1000 - 2000 words</option>
              <option>2000+ words</option>
            </select>
          </div>

          <div className="mt-2 sm:col-span-3">
            <select
              id="Deadline"
              name="Deadline"
              onChange={(e) => set(e.target.value)}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option disabled selected style={{ display: 'none' }}>Deadline</option>
              <option>same day</option>
              <option>2 - 3 days</option>
              <option>7 - 15 days</option>
            </select>
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
    </form >
  )
}

export default Calculator