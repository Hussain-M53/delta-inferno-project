'use client'
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@context/AuthContext.js';
import { useRouter } from 'next/navigation';
import { serviceOptions, paperOptions, academicLevelOptions, deadlineOptions, citationOptions, spacingOptions } from '@utils/FieldDetails';


const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { user } = useContext(AuthContext)
  const router = useRouter();

  const [typeOfService, setTypeOfService] = useState('Type of Service');
  const [typeOfPaper, setTypeOfPaper] = useState('Type of Paper');
  const [subject, setSubject] = useState('Subject');

  const updateFormData = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
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
    console.log(formData)
  };

  useEffect(() => {
    if (user.userName != '') {
      router.push('/Login');
    }
  }, [])

  return (
    <form onSubmit={handleFormSubmit} className='mt-10 '>
      {step === 1 && (
        <div className='bg-gray-900 w-2/3 mx-auto p-10 rounded-lg flex flex-col justify-center items-center space-y-10'>
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

          <div onClick={handleNext} className="w-4/5 flex justify-center items-center rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-300 ease-in-out hover:bg-red-400">
            Next
          </div>
        </div>
      )}

      {step === 2 && (
        <div className='bg-gray-900 w-2/3 mx-auto p-10 mt-10 rounded-lg flex flex-col justify-center items-center space-y-10'>
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


          <div className="flex space-x-2 w-4/5">
            <div onClick={handleBack} className="flex justify-center items-center w-80 rounded-md bg-btn-color px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-300 ease-in-out hover:bg-cyan-400">
              Back
            </div>
            <div onClick={handleNext} className="flex justify-center items-center w-80 rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-300 ease-in-out hover:bg-red-400">
              Next
            </div>
          </div>

        </div>
      )}

      {step === 3 && (
        <div className='bg-gray-900 w-2/3 mx-auto p-10 rounded-lg flex flex-col justify-center items-center space-y-10'>
          <div className='text-center font-bold text-2xl text-white pb-4 border-b border-gray-100'>
            Assignment Details
          </div>
          <div className="w-4/5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <div className="mt-2 col-span-1">
              <select
                id="AcademicLevel"
                name="AcademicLevel"
                onChange={handleFormChange}
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
                name="TypeOfService"
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
                name="TypeOfPaper"
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
                onChange={(e) => {setSubject(e.target.value); handleFormChange}}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option disabled selected style={{ display: 'none' }}>Subject</option>
                {getSubjectOptions().map((subj, idx) => <option key={idx}>{subj}</option>)}
              </select>
            </div>

            <div className="mt-2 sm:col-span-1 sm:col-start-1">
              <input
                type="text"
                id="WordLimit"
                name="Word Limit"
                placeholder="Word Limit"
                onChange={handleFormChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-2 sm:col-span-1">
              <select
                id="Deadline"
                name="Deadline"
                onChange={handleFormChange}
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
              <input type="checkbox" name="Terms And Conditions" onChange={ handleFormChange} />
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
            <div onClick={handleFormSubmit} className="w-full flex justify-center items-center rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform duration-300 ease-in-out hover:bg-red-400">
              Proceed To Payment
            </div>
          </div>

        </div>
      )}
    </form>
  );
};

export default Form;
