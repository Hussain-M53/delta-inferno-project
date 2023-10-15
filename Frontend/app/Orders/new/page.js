'use client'
import { useContext, useEffect, useState } from 'react';
import { academicLevelOptions, deadlineOptions, citationOptions, spacingOptions } from '@utils/FieldDetails';
import { loadStripe } from '@stripe/stripe-js';
import { OrderDetailsContext } from '@context/OrderContext';

const Form = () => {

  const { orderDetails, setOrderDetails } = useContext(OrderDetailsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [paperOptions, setPaperOptions] = useState({});
  const [serviceOptions, setServiceOptions] = useState({});
  const [calculatedPrice, setCalculatedPrice] = useState(0);

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
  }, [orderDetails['Academic Level'], orderDetails['Subject'], orderDetails['Word Limit'], orderDetails['Deadline']]);

  const updateFormData = (name, value) => {
    setOrderDetails((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const getPrice = async () => {
    setIsLoading(true);
    const prompt = {
      "Academic Level": orderDetails['Academic Level'],
      "Type of Service": orderDetails['Type of Service'],
      "Type of Paper": orderDetails['Type of Paper'],
      "Subject": orderDetails['Subject'],
      "Word Limit": orderDetails['Word Limit'],
      "Deadline": orderDetails['Deadline'],
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
  
  const areFieldsValid = () => {
    return (
      orderDetails['Academic Level'] !== 'Academic Level' &&
      orderDetails['Type of Service'] !== 'Type of Service' &&
      orderDetails['Type of Paper'] !== 'Type of Paper' &&
      orderDetails['Subject'] !== 'Subject' &&
      orderDetails['Word Limit'] &&
      orderDetails['Deadline'] !== 'Deadline'
    );
  };
  const validForPayment = () => {
    return (
      areFieldsValid() &&
      orderDetails['Full Name'] != '' &&
      orderDetails['Email'] != '' &&
      orderDetails['Assignment Topic'] != '' &&
      orderDetails['Additional Information'] != '' &&
      orderDetails['Citation'] != 'Citation' &&
      orderDetails['Spacing'] != 'Spacing'
    );
  }


  const getTypeOfPaperOptions = () => {
    if (orderDetails['Type of Service'] === 'Type of Service') return [];
    return serviceOptions[orderDetails['Type of Service']] || [];
  }

  const getSubjectOptions = () => {
    if (orderDetails['Type of Paper'] === 'Type of Paper') return [];
    return paperOptions[orderDetails['Type of Paper']] || [];
  }

  const handleTypeOfServiceChange = (e) => {
    updateFormData("Type of Service", e.target.value);
    updateFormData('Type of Paper', 'Type of Paper');
    updateFormData('Subject', 'Subject');
  }

  const handleTypeOfPaperChange = (e) => {
    updateFormData("Type of Paper", e.target.value);
    updateFormData('Subject', 'Subject');
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    makePayment()
  };

  const makePayment = async () => {
    orderDetails['Fee'] = calculatedPrice;
    setIsLoading(true);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const body = {
      'Order_Details': orderDetails
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
    const result = stripe.redirectToCheckout({
      sessionId
    });

    if (result.error) {
      console.error(result.error)
    }
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleFormSubmit} className='mt-10 '>
      <div className='bg-btn-color w-4/5 sm:w-3/4 mx-auto p-6 sm:p-10 rounded-lg flex flex-col justify-center items-center space-y-10'>
        <div className='text-center font-bold text-2xl text-white pb-4 border-b border-gray-100'>
          Order Details and Terms Agreement
        </div>
        <div className="w-4/5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="mt-2 col-span-1 ">
            <input
              type="text"
              id="FullName"
              name="Full Name"
              value={orderDetails['Full Name']}
              placeholder="Full Name"
              onChange={handleFormChange}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>

          <div className="mt-2 col-span-1">
            <input
              type="email"
              id="Email"
              name="Email"
              value={orderDetails['Email']}
              placeholder="Email Address"
              onChange={handleFormChange}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-2 col-span-1">
            <select
              id="AcademicLevel"
              name="Academic Level"
              value={orderDetails['Academic Level']}
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
              name="Type of Service"
              value={orderDetails['Type of Service']}
              onChange={(e) => handleTypeOfServiceChange(e)}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option selected style={{ display: 'none' }}>Type of Service</option>
              {Object.keys(serviceOptions).map((service, idx) => <option key={idx}>{service}</option>)}
            </select>
          </div>

          <div className="mt-2 sm:col-span-1 ">
            <select
              id="TypeOfPaper"
              name="Type of Paper"
              value={orderDetails['Type of Paper']}
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
              value={orderDetails['Subject']}
              onChange={handleFormChange}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option disabled selected style={{ display: 'none' }}>Subject</option>
              {getSubjectOptions().map((subj, idx) => <option key={idx}>{subj}</option>)}
            </select>
          </div>

          <div className="mt-2 sm:col-span-1 ">
            <input
              type="number"
              id="WordLimit"
              name="Word Limit"
              value={orderDetails['Word Limit']}
              placeholder="Word Limit"
              onChange={handleFormChange}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>

          <div className="mt-2 sm:col-span-1">
            <select
              id="Deadline"
              name="Deadline"
              value={orderDetails['Deadline']}
              onChange={handleFormChange}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option disabled selected style={{ display: 'none' }}>Deadline</option>
              {
                deadlineOptions.map((option, idx) => <option key={idx}>{option}</option>)
              }
            </select>
          </div>

          <div className="mt-2 col-span-1">
            <input
              type="text"
              id="AssignmentTopic"
              name="Assignment Topic"
              placeholder="Assignment Topic"
              value={orderDetails['Assignment Topic']}
              onChange={handleFormChange}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            />
          </div>

          <div className="mt-2 sm:col-span-1">
            <select
              id="Citation"
              name="Citation"
              value={orderDetails['Citation']}
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
              value={orderDetails['Spacing']}
              onChange={handleFormChange}
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option disabled selected style={{ display: 'none' }}>Spacing</option>
              {spacingOptions.map((option, idx) => <option key={idx}>{option}</option>)}
            </select>
          </div>

          <div className="mt-2 sm:col-span-1 w-full text-white py-1.5">
            <div className='flex items-center font-bold text-black text-lg'>Final Price - $  {isLoading ? (
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
            <div className='text-white text-sm mb-1'>
              Please provide any additional details about your assignment
            </div>
            <textarea name="Additional Information" className='w-full p-2' value={orderDetails['Additional Information']} onChange={handleFormChange}></textarea>
          </div>

        </div>

        <div className='border-b border-gray-100 w-4/5' />

        <div className="flex space-x-2 w-4/5">
          <button
            type="submit"
            disabled={validForPayment()}
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
    </form>
  );
};

export default Form;
