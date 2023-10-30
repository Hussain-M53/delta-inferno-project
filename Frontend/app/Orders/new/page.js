'use client'
import { useContext, useEffect, useState } from 'react';
import { academicLevelOptions, deadlineOptions, citationOptions, spacingOptions, wordLimitOptions } from '@utils/FieldDetails';
import { loadStripe } from '@stripe/stripe-js';
import { OrderDetailsContext } from '@context/OrderContext';
import { AuthContext } from '@context/AuthContext';

const Form = () => {
  const { orderDetails, setOrderDetails } = useContext(OrderDetailsContext);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
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
    setIsLoadingQuote(true);
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
    setIsLoadingQuote(false);

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
    updateFormData("Type of Service", e);
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await makePayment();
  };

  const makePayment = async () => {
    if (user.discount > 0) {
      setCalculatedPrice(((1 - (user.discount / 100)) * calculatedPrice).toFixed(1));
    }
    orderDetails['Fee'] = ((1 - (user.discount / 100)) * calculatedPrice).toFixed(1);
    localStorage.setItem('OrderDetails', JSON.stringify(orderDetails));

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
    <div className='my-10 w-full flex justify-center gap-x-6'>
      <div className='w-4/5 md:w-3/5'>
        <form onSubmit={handleFormSubmit} >
          <div className='bg-btn-color mx-auto p-4 md:p-10 rounded-lg flex flex-col justify-center items-center space-y-6'>
            <div className='text-center font-bold text-2xl text-white pb-4 border-b border-gray-100'>
              Order Details and Terms Agreement
            </div>
            <div className="w-full grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="col-span-1 ">
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

              <div className="col-span-1">
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

              <div className="sm:col-span-1">
                <select
                  id="WordLimit"
                  name="Word Limit"
                  value={orderDetails['Word Limit']}
                  onChange={handleFormChange}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option disabled selected style={{ display: 'none' }}>Word Limit</option>
                  {
                    wordLimitOptions.map((option) => <option>{option}</option>)
                  }
                </select>
              </div>

              <div className="sm:col-span-1">
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

              <div className="col-span-1">
                <input
                  type="text"
                  id="AssignmentTopic"
                  name="Assignment Topic"
                  placeholder="Assignment Topic"
                  value={orderDetails['Assignment Topic']}
                  onChange={handleFormChange}
                  className="pl-2 block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>

              <div className="col-span-1">
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

              <div className="sm:col-span-full sm:col-start-1 flex">
                <div className={`w-1/3 flex justify-center items-center hover:cursor-pointer text-sm p-1  rounded-l-lg ${orderDetails['Type of Service'] === 'Writing' ? 'text-gray-200 bg-black' : 'bg-gray-200 text-gray-900'}`} onClick={(e) => handleTypeOfServiceChange('Writing')}>Writing</div>
                <div className={`w-1/3 flex justify-center items-center hover:cursor-pointer text-sm p-1 border border-x-btn-color ${orderDetails['Type of Service'] === 'Editing' ? 'text-gray-200 bg-black' : 'bg-gray-200 text-gray-900'}`} onClick={(e) => handleTypeOfServiceChange('Editing')}>Editing</div>
                <div className={`w-1/3 text-center hover:cursor-pointer text-sm p-1 rounded-r-lg ${orderDetails['Type of Service'] === 'Proof Reading' ? 'text-gray-200 bg-black' : 'bg-gray-200 text-gray-900'}`} onClick={(e) => handleTypeOfServiceChange('Proof Reading')}>Proof Read</div>
              </div>

              <div className="sm:col-span-1 ">
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

              <div className="sm:col-span-1">
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

              <div className="sm:col-span-1">
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

              <div className="sm:col-span-1">
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

              <div className='col-span-full col-start-1'>
                <div className='text-white text-sm mb-1'>
                  Please provide any additional details about your assignment
                </div>
                <textarea name="Additional Information" className='w-full p-2' value={orderDetails['Additional Information']} onChange={handleFormChange}></textarea>
              </div>

              <div className={`col-span-full sm:hidden  flex ${user.discount >= 0 ? 'flex-col' : 'justify-between items-center'} font-bold text-2xl border-t pt-6 px-2 border-white text-white`}>
                <div>
                  Final Price
                </div>
                <div className={`flex justify-between items-center ${user.discount >= 0 && 'mb-2'}`}>
                  {user.discount >= 0 &&
                    <div className='flex items-center gap-x-1'>
                      <span className='text-sm text-white p-2 bg-green-500 rounded-md'>
                        {user.discount}% off
                      </span>
                      <span className='line-through font-bold text-xl'> ${calculatedPrice.toFixed(1)}</span>
                    </div>
                  }
                  <div className='font-bold text-2xl flex items-center'>🔥 ${isLoadingQuote ? (
                    <svg className="animate-spin ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.21.896 4.21 2.344 5.648l2.657-2.357z"></path>
                    </svg>
                  )
                    : user.discount >= 0 ?
                      ((1 - (user.discount / 100)) * calculatedPrice).toFixed(1)
                      : calculatedPrice.toFixed(1)
                  }
                  </div>
                </div>
              </div>

            </div>

            <div className='border-b border-gray-100 w-full' />

            <div className="flex space-x-2 w-full">
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
        </form>
      </div>

      <div className='hidden sm:block w-2/5 md:w-1/3 min-h-fit bg-gray-900 px-4 py-8 rounded-lg'>
        <div className='text-center font-bold text-lg md:text-2xl border-b-2 pb-2 mb-4 border-white text-white'>Order Summary</div>

        <div className='text-xs md:text-sm lg:text-md'>
          {orderDetails['Full Name'] != '' && <div className='my-1 text-white p-1 border-b border-gray-300 flex justify-between'><div>Full Name : </div><div>{orderDetails['Full Name']}</div></div>}
          {orderDetails['Email'] != '' && <div className='my-1 text-white p-1 border-b border-gray-300 flex justify-between'><div>Email : </div><div>{orderDetails['Email']}</div></div>}
          {orderDetails['Assignment Topic'] != '' && <div className='my-1 text-white p-1 border-b border-gray-300 flex justify-between'><div>Assignment Topic : </div><div>{orderDetails['Assignment Topic']}</div></div>}
          {orderDetails['Academic Level'] != 'Academic Level' && <div className='my-1 text-white p-1 border-b border-gray-300 flex justify-between'><div>Academic Level : </div><div>{orderDetails['Academic Level']}</div></div>}
          {orderDetails['Type of Service'] != '' && <div className='my-1 text-white p-1 border-b border-gray-300 flex justify-between'><div>Type of Service : </div><div>{orderDetails['Type of Service']}</div></div>}
          {orderDetails['Type of Paper'] != 'Type of Paper' && <div className='my-1 text-white p-1 border-b border-gray-300 flex justify-between'><div>Type of Paper : </div><div>{orderDetails['Type of Paper']}</div></div>}
          {orderDetails['Subject'] != 'Subject' && <div className='my-1 text-white p-1 border-b border-gray-300 flex justify-between'><div>Subject : </div><div>{orderDetails['Subject']}</div></div>}
          {orderDetails['Word Limit'] != null && <div className='my-1 text-white p-1 border-b border-gray-300 flex justify-between'><div>Word Limit : </div><div>{orderDetails['Word Limit']}</div></div>}
          {orderDetails['Deadline'] != 'Deadline' && <div className='my-1 text-white p-1 border-b border-gray-300 flex justify-between'><div>Deadline : </div><div>{orderDetails['Deadline']}</div></div>}
          {orderDetails['Citation'] != 'Citation' && <div className='my-1 text-white p-1 border-b border-gray-300 flex justify-between'><div>Citation : </div><div>{orderDetails['Citation']}</div></div>}
          {orderDetails['Spacing'] != 'Spacing' && <div className='my-1 text-white p-1 border-b border-gray-300 flex justify-between'><div>Spacing : </div><div>{orderDetails['Spacing']}</div></div>}
        </div>

        <div className={`${user.discount >= 0 ? 'flex-col' : 'justify-between items-center'} font-bold text-lg md:text-2xl border-y-2 mt-6 pt-4 border-white text-white`}>
          <div>
            Final Price
          </div>
          <div className={`flex justify-between items-center ${user.discount >= 0 && 'mb-2'}`}>
            {user.discount >= 0 &&
              <div className='flex items-center gap-x-1'>
                <span className='text-sm text-white p-2 bg-green-500 rounded-md'>
                  {user.discount}% off
                </span>
                <span className='line-through font-bold text-xl'> ${calculatedPrice.toFixed(1)}</span>
              </div>
            }
            <div className='font-bold text-2xl flex items-center'>🔥 ${isLoadingQuote ? (
              <svg className="animate-spin ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.21.896 4.21 2.344 5.648l2.657-2.357z"></path>
              </svg>
            )
              : user.discount >= 0 ?
                ((1 - (user.discount / 100)) * calculatedPrice).toFixed(1)
                : calculatedPrice.toFixed(1)
            }
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Form;
