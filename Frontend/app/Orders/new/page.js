'use client'
import { useContext, useEffect, useState } from 'react';
import { academicLevelOptions, deadlineOptions, citationOptions, spacingOptions } from '@utils/FieldDetails';
import { loadStripe } from '@stripe/stripe-js';
import { OrderDetailsContext } from '@context/OrderContext';

const Form = () => {

  const { setOrderDetails } = useContext(OrderDetailsContext);
  const initialFormData = {
    'First Name': '',
    'Last Name': '',
    'Date': '',
    'Contact Number': '',
    'Personal Email': '',
    'University Name': '',
    'University ID': '',
    'University Email': '',
    'Assignment Topic': '',
    'Additional Information': '',
    'Citation': '',
    'Spacing': '',
    'File': '',
    'Terms And Conditions': '',
    'Digital Signature': '',
    'Academic Level': 'Academic Level',
    'Type of Service': 'Type of Service',
    'Type of Paper': 'Type of Paper',
    'Subject': 'Subject',
    'Word Limit': null,  // Word Limit might need a different initial value since it's a number.
    'Deadline': 'Deadline'
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [paperOptions, setPaperOptions] = useState({});
  const [serviceOptions, setServiceOptions] = useState({});
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [academicLevel, setAcademicLevel] = useState('Academic Level');
  const [deadline, setDeadline] = useState('Deadline');
  const [typeOfService, setTypeOfService] = useState('Type of Service');
  const [typeOfPaper, setTypeOfPaper] = useState('Type of Paper');
  const [subject, setSubject] = useState('Subject');
  const [wordLimit, setWordLimit] = useState(null);


  useEffect(() => {

    const fetchFields = async () => {
      try {
        const url = new URL('https://delta-inferno-project-pijr.vercel.app/get-fields');
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

        const fields = await response.json();
        setPaperOptions(fields['paperOptions']);
        setServiceOptions(fields['serviceOptions']);
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    }

    fetchFields();
  }, [])

  useEffect(() => {
    if (areFieldsValid()) {
      getPrice();
    }
  }, [academicLevel, subject, wordLimit, deadline]);

  const updateFormData = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const getPrice = async () => {
    setIsLoading(true);
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
    setIsLoading(false);

  }

  const validStep1 = () => {
    return (
      typeof formData['First Name'] === 'string' && formData['First Name'].trim() !== '' &&
      typeof formData['Last Name'] === 'string' && formData['Last Name'].trim() !== '' &&
      typeof formData['Date'] === 'string' && formData['Date'].trim() !== '' &&
      typeof formData['Contact Number'] === 'string' && formData['Contact Number'].trim() !== '' &&
      typeof formData['Personal Email'] === 'string' && formData['Personal Email'].trim() !== ''
    );
  };


  const validStep2 = () => {
    return (
      typeof formData['University Name'] === 'string' && formData['University Name'].trim() !== '' &&
      typeof formData['University ID'] === 'string' && formData['University ID'].trim() !== '' &&
      typeof formData['University Email'] === 'string' && formData['University Email'].trim() !== ''
    );
  };

  const validForPayment = () => {
    return (
      academicLevel !== 'Academic Level' &&
      typeOfService !== 'Type of Service' &&
      typeOfPaper !== 'Type of Paper' &&
      subject !== 'Subject' &&
      wordLimit &&
      deadline !== 'Deadline' &&
      validStep1() &&
      validStep2() &&
      formData['Assignment Topic'] != '' &&
      formData['Additional Information'] != '' &&
      formData['Citation'] != '' &&
      formData['Spacing'] != '' &&
      formData['File'] != '' &&
      formData['Terms And Conditions'] != '' &&
      formData['Digital Signature'] != ''
    );
  }

  const areFieldsValid = () => {
    return (
      (academicLevel !== 'Academic Level') &&
      (typeOfService !== 'Type of Service') &&
      (typeOfPaper !== 'Type of Paper') &&
      (subject !== 'Subject') &&
      wordLimit &&
      (deadline !== 'Deadline')
    );
  };

  const getTypeOfPaperOptions = () => {
    if (typeOfService === 'Type of Service') return [];
    return serviceOptions[typeOfService] || [];
  }

  const getSubjectOptions = () => {
    if (typeOfPaper === 'Type of Paper') return [];
    return paperOptions[typeOfPaper] || [];
  }

  const handleAcademicLevelChange = (e) => {
    setAcademicLevel(e.target.value);
    handleDropdownChange("Academic Level", e.target.value);
  }

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
    handleDropdownChange("Deadline", e.target.value);
  }

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    handleDropdownChange("Subject", e.target.value);
  }

  const handleWordLimitChange = (e) => {
    setWordLimit(e.target.value);
    handleDropdownChange("Word Limit", e.target.value);
  }

  const handleTypeOfServiceChange = (e) => {
    setTypeOfService(e.target.value);
    handleDropdownChange("Type Of Service", e.target.value);
    setTypeOfPaper('Type of Paper');
    setSubject('Subject');
  }

  const handleTypeOfPaperChange = (e) => {
    setTypeOfPaper(e.target.value);
    handleDropdownChange("Type Of Paper", e.target.value);
    setSubject('Subject');
  }

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleDropdownChange = (name, value) => {
    updateFormData(name, value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    makePayment()
  };

  const makePayment = async () => {
    formData['Fee'] = calculatedPrice;
    console.log(formData)
    setIsLoading(true);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const body = {
      'Order_Details': formData
    }
    const headers = {
      'Content-Type': 'application/json'
    }

    const response = await fetch('https://delta-inferno-project-pijr.vercel.app/create-payment-session', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })

    const { sessionId } = await response.json();
    console.log('Response from server:', { sessionId });
    setOrderDetails(formData);
    const result = stripe.redirectToCheckout({
      sessionId
    });

    if (result.error) {
      console.log(result.error)
    }
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleFormSubmit} className='mt-10 '>
      {step === 1 && (
        <div className='bg-gray-900 w-4/5 sm:w-2/3 mx-auto p-6 sm:p-10 rounded-lg flex flex-col justify-center items-center space-y-10'>
          <div className='text-center font-bold text-2xl text-white pb-4 border-b border-gray-100'>
            Order Details and Terms Agreement
          </div>

          <div className='w-4/5 grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2'>
            <div className="mt-2 col-span-1 col-start-1">
              <input
                type="text"
                id="FirstName"
                name="First Name"
                placeholder="First Name"
                onChange={handleFormChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-2 col-span-1">
              <input
                type="text"
                id="LastName"
                name="Last Name"
                placeholder="Last Name"
                onChange={handleFormChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-2 col-span-1 col-start-1">
              <input
                type="date"
                id="Date"
                name="Date"
                placeholder="Date"
                onChange={handleFormChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-2 col-span-1">
              <input
                type="text"
                id="ContactNumber"
                name="Contact Number"
                placeholder="Contact Number"
                onChange={handleFormChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-2 col-span-1 col-start-1">
              <input
                type="email"
                id="Email"
                name="Personal Email"
                placeholder="Personal Email Address"
                onChange={handleFormChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className='border-b border-gray-100 w-4/5' />

          <div onClick={() => { if (validStep1()) { handleNext(); } }} className={`w-4/5 flex justify-center items-center rounded-md ${validStep1() ? ' bg-red-600 hover:bg-red-400' : ' bg-gray-400'} px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-300 ease-in-out `}>
            Next
          </div>
        </div>
      )}

      {step === 2 && (
        <div className='bg-gray-900 w-4/5 sm:w-2/3 mx-auto p-6 sm:p-10 mt-10 rounded-lg flex flex-col justify-center items-center space-y-10'>
          <div className='text-center font-bold text-2xl text-white pb-4 border-b border-gray-100'>
            University Information
          </div>

          <div className='w-4/5 grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-2'>
            <div className="mt-2 col-span-1 col-start-1">
              <input
                type="text"
                id="UniversityName"
                name="University Name"
                placeholder="University Name"
                onChange={handleFormChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-2 col-span-1">
              <input
                type="text"
                id="UniversityID"
                name="University ID"
                placeholder="University ID"
                onChange={handleFormChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-2 col-span-1 col-start-1">
              <input
                type="email"
                id="UniversityEmail"
                name="University Email"
                placeholder="University Email Address"
                onChange={handleFormChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>

          </div>

          <div className='border-b border-gray-100 w-4/5' />
          <div className="flex justify-center space-x-2 w-4/5">
            <div onClick={handleBack} className="flex justify-center items-center w-80 rounded-md bg-btn-color px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-300 ease-in-out hover:bg-cyan-400">
              Back
            </div>
            <div onClick={() => { if (validStep2()) { handleNext(); } }} className={`flex justify-center items-center w-80 rounded-md ${validStep2() ? ' bg-red-600 hover:bg-red-400' : ' bg-gray-400 '} px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-300 ease-in-out `}>
              Next
            </div>
          </div>

        </div>
      )}

      {step === 3 && (
        <div className='bg-gray-900 w-4/5 sm:w-2/3 mx-auto p-6 sm:p-10 rounded-lg flex flex-col justify-center items-center space-y-10'>
          <div className='text-center font-bold text-2xl text-white pb-4 border-b border-gray-100'>
            Assignment Details
          </div>
          <div className="w-4/5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <div className="mt-2 col-span-1">
              <select
                id="AcademicLevel"
                name="AcademicLevel"
                value={academicLevel}
                onChange={(e) => handleAcademicLevelChange(e)}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option disabled selected style={{ display: 'none' }}>Academic Level</option>
                {
                  academicLevelOptions.map((option, idx) => <option key={idx}>{option}</option>)
                }
              </select>
            </div>

            <div className="mt-2 sm:col-span-1">
              <select
                id="TypeOfService"
                name="Type of Service"
                value={typeOfService}
                onChange={(e) => handleTypeOfServiceChange(e)}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option selected style={{ display: 'none' }}>Type of Service</option>
                {Object.keys(serviceOptions).map((service, idx) => <option key={idx}>{service}</option>)}
              </select>
            </div>

            <div className="mt-2 sm:col-span-1 sm:col-start-1">
              <select
                id="TypeOfPaper"
                name="Type of Paper"
                value={typeOfPaper}
                onChange={(e) => handleTypeOfPaperChange(e)}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option disabled selected style={{ display: 'none' }}>Type of Paper</option>
                {getTypeOfPaperOptions().map((paper, idx) => <option key={idx}>{paper}</option>)}
              </select>
            </div>

            <div className="mt-2 sm:col-span-1">
              <select
                id="Subject"
                name="Subject"
                value={subject}
                onChange={(e) => { handleSubjectChange(e) }}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option disabled selected style={{ display: 'none' }}>Subject</option>
                {getSubjectOptions().map((subj, idx) => <option key={idx}>{subj}</option>)}
              </select>
            </div>

            <div className="mt-2 sm:col-span-1 sm:col-start-1">
              <input
                type="number"
                id="WordLimit"
                name="Word Limit"
                value={wordLimit}
                placeholder="Word Limit"
                onChange={(e) => handleWordLimitChange(e)}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2 sm:col-span-1">
              <select
                id="Deadline"
                name="Deadline"
                value={deadline}
                onChange={(e) => handleDeadlineChange(e)}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option disabled selected style={{ display: 'none' }}>Deadline</option>
                {
                  deadlineOptions.map((option, idx) => <option key={idx}>{option}</option>)
                }
              </select>
            </div>

            <div className="mt-2 col-span-1 sm:col-start-1">
              <input
                type="text"
                id="AssignmentTopic"
                name="Assignment Topic"
                placeholder="Assignment Topic"
                onChange={handleFormChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2 sm:col-span-1">
              <select
                id="Citation"
                name="Citation"
                onChange={handleFormChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option disabled selected style={{ display: 'none' }}>Citation</option>
                {citationOptions.map((option, idx) => <option key={idx}>{option}</option>)}
              </select>
            </div>

            <div className="mt-2 sm:col-span-1">
              <select
                id="Spacing"
                name="Spacing"
                onChange={handleFormChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option disabled selected style={{ display: 'none' }}>Spacing</option>
                {spacingOptions.map((option, idx) => <option key={idx}>{option}</option>)}
              </select>
            </div>

            <div className="mt-2 sm:col-span-1 w-full text-white py-1.5">
              <div className='flex items-center'>Final Price - $  {isLoading ? (
                <svg className="animate-spin ml-2 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.21.896 4.21 2.344 5.648l2.657-2.357z"></path>
                </svg>
              )
                : calculatedPrice
              }
              </div>
            </div>

            <div className='mt-4 sm:col-span-2'>
              <div className='text-gray-400 text-sm mb-1'>
                Please provide any additional details about your assignment
              </div>
              <textarea name="Additional Information" className='w-full p-2' onChange={handleFormChange}></textarea>
            </div>

            <div className='mt-4 sm:col-span-2'>
              <div className='text-gray-400 text-sm mb-1'>
                Assignment Supporting Documents (Please upload all relevant documents including course work ppts)
              </div>
              <input type="file" name="File" onChange={handleFormChange} className='text-red-600' />
            </div>

            <div className='mt-4 flex sm:col-span-2'>
              <input type="checkbox" name="Terms And Conditions" onChange={handleFormChange} />
              <div className='ml-2 text-gray-400'>
                By clicking the submit button, I agree to terms & conditions.
                <span className='text-red-500'>
                  *
                </span>
              </div>
            </div>

            <div className=' mt-4 sm:col-span-2'>
              <div className='text-gray-400 mr-2 mb-1'>
                Digital Signature </div>
              <input type="text" className='p-1' name="Digital Signature" onChange={handleFormChange} />
            </div>
          </div>

          <div className='border-b border-gray-100 w-4/5' />

          <div className="flex space-x-2 w-4/5">
            <div onClick={handleBack} className="w-full flex justify-center items-center rounded-md bg-btn-color px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-300 ease-in-out hover:bg-cyan-400">
              Back
            </div>
            <button
              type="submit"
              disabled={!validForPayment()}
              className={`w-full flex justify-center items-center rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm transition-transform duration-300 ease-in-out hover:bg-red-400 
        ${validForPayment() ? 'bg-red-600 text-white' : 'bg-gray-400 text-gray-500 pointer-events-none opacity-50'}`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.21.896 4.21 2.344 5.648l2.657-2.357z"></path>
                  </svg>
                  Processing...
                </span>
              )
                : 'Proceed to Payment'}
            </button>
          </div>

        </div>
      )}
    </form>
  );
};

export default Form;
