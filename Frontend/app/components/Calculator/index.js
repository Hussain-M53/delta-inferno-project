'use client'
import { useState, useEffect, useRef } from 'react'
import { serviceOptions, paperOptions, academicLevelOptions, deadlineOptions } from '@utils/FieldDetails';
import Link from 'next/link';

const Calculator = () => {

  const [isVisible, setIsVisible] = useState(false);
  const calcRef = useRef();

  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [typeOfService, setTypeOfService] = useState('Type of Service');
  const [typeOfPaper, setTypeOfPaper] = useState('Type of Paper');
  const [subject, setSubject] = useState('Subject');
  const [academicLevel, setAcademicLevel] = useState('Academic Level');
  const [wordLimit, setWordLimit] = useState(null);
  const [deadline, setDeadline] = useState('Deadline');

  const areFieldsValid = () => {
    return (
      academicLevel !== 'Academic Level' &&
      typeOfService !== 'Type of Service' &&
      typeOfPaper !== 'Type of Paper' &&
      subject !== 'Subject' &&
      wordLimit &&
      deadline !== 'Deadline'
    );
  };

  const handleAcademicLevelChange = (e) => {
    if (areFieldsValid()) {
      getPrice();
    }
    setAcademicLevel(e.target.value);
  }

  const handleDeadlineChange = (e) => {
    if (areFieldsValid()) {
      console.log("execute")
      getPrice();
    }
    setDeadline(e.target.value);
  }

  const handleSubjectChange = (e) => {
    if (areFieldsValid()) {
      getPrice();
    }
    setSubject(e.target.value);
  }

  const handleWordLimitChange = () => {
    if (areFieldsValid()) {
      getPrice();
    }
  }

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
    setTypeOfPaper('Type of Paper');
    setSubject('Subject');
  }

  const handleTypeOfPaperChange = (e) => {
    setTypeOfPaper(e.target.value);
    setSubject('Subject');
  }

  const getPrice = async () => {
    const prompt = {
      "Academic Level": academicLevel,
      "Type of Service": typeOfService,
      "Type of Paper": typeOfPaper,
      "Subject": subject,
      "Word Limit": wordLimit,
      "Deadline": deadline,
    }
    try {
      const url = new URL('https://delta-inferno-project-pijr.vercel.app/get-quote');
      url.search = new URLSearchParams(prompt).toString();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',

        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCalculatedPrice(data.total_price);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    }, { threshold: 0.5 });

    if (calcRef.current) {
      observer.observe(calcRef.current);
    }
    return () => observer.disconnect();
  }, []);


  return (
    <form
      ref={calcRef}
      className={`bg-btn-color transition-all transform duration-1000 px-6 sm:px-20 z-10 md:w-1/2 border-2 border-gray-100 rounded-3xl mt-4 max-h-fit py-10 hover:shadow-sm ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'}`}>
      <div className="border-b border-gray-900/10 pb-6">
        <h2 className="text-3xl font-bold tracking-tight text-center leading-7 text-gray-900 sm:text-5xl  ">Get a Price Quote</h2>
        <p className="text-center mt-1 text-sm leading-6 text-gray-600">
          We offer transparency, and authentic service
        </p>
      </div>

      <div className=" border-b border-gray-900/10 pb-6">
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="mt-2 sm:col-span-3">
            <select
              id="AcademicLevel"
              name="AcademicLevel"
              onChange={(e) => handleAcademicLevelChange(e)}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option disabled selected style={{ display: 'none' }}>Academic Level</option>
              {
                academicLevelOptions.map((option) => <option>{option}</option>)
              }
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
              <option selected style={{ display: 'none' }}>Type of Service</option>
              {Object.keys(serviceOptions).map((service, idx) => <option key={idx}>{service}</option>)}
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
              <option disabled selected style={{ display: 'none' }}>Type of Paper</option>
              {getTypeOfPaperOptions().map((paper, idx) => <option key={idx}>{paper}</option>)}
            </select>
          </div>

          <div className="mt-2 sm:col-span-3">
            <select
              id="Subject"
              name="Subject"
              value={subject}
              onChange={(e) => handleSubjectChange(e)}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option disabled selected style={{ display: 'none' }}>Subject</option>
              {getSubjectOptions().map((subj, idx) => <option key={idx}>{subj}</option>)}
            </select>
          </div>

          <div className="mt-2 sm:col-span-3 sm:col-start-1">
            <input
              type="number"
              id="WordLimit"
              name="WordLimit"
              value={wordLimit}
              placeholder="Word Limit"
              onChange={(e) => setWordLimit(e.target.value)}
              onBlur={() => handleWordLimitChange()}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>

          <div className="mt-2 sm:col-span-3">
            <select
              id="Deadline"
              name="Deadline"
              onChange={(e) => handleDeadlineChange(e)}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option disabled selected style={{ display: 'none' }}>Deadline</option>
              {
                deadlineOptions.map((option) => <option>{option}</option>)
              }
            </select>
          </div>

        </div>
        <div className="border-t border-gray-900/10 pt-6 mt-6 flex items-center justify-between gap-x-6">
          <h1 className='font-bold text-2xl'>$ {calculatedPrice}</h1>
          <Link
            href={'/Orders/new'}
            className='rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-900'>
            Place Order Now!
          </Link>
        </div>
      </div>
    </form >
  )
}

export default Calculator