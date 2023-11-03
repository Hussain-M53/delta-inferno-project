'use client'
import { useState, useEffect, useRef, useContext } from 'react'
import { academicLevelOptions, deadlineOptions, wordLimitOptions } from '@utils/FieldDetails';
import Link from 'next/link';
import { fetchData } from '@utils/CMS_Retreival';
import { OrderDetailsContext } from '@context/OrderContext';
import { AuthContext } from '@context/AuthContext';

const Calculator = () => {
  const { orderDetails, setOrderDetails } = useContext(OrderDetailsContext);
  const { user } = useContext(AuthContext);

  const [isVisible, setIsVisible] = useState(false);
  const calcRef = useRef();
  const [paperOptions, setPaperOptions] = useState({});
  const [serviceOptions, setServiceOptions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [header, setHeader] = useState({});
  const [calculatedPrice, setCalculatedPrice] = useState(0);

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

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchData('calculator');
        if (data && data.result && data.result.length > 0) {
          setHeader(({
            'title': data.result[0].title,
            'subTitle': data.result[0].subTitle,
          }));
        }
      } catch (error) {
        console.error('Error fetching and setting data:', error);
      }
    };

    fetchDataAndSetState();
  }, []);

  useEffect(() => {
    if (areFieldsValid()) {
      getPrice();
    }
  }, [orderDetails['Academic Level'], orderDetails['Subject'], orderDetails['Word Limit'], orderDetails['Deadline']]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const updateFormData = (name, value) => {
    setIsLoading(true);
    setOrderDetails((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

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

  const getPrice = async () => {
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


  return (
    <div className='flex justify-center items-center lg:w-1/2 lg:h-fit sm:mt-2'>
      <div
        className='p-2 md:p-16 mx-2 sm:bg-btn-color rounded-full'>
        <form
          ref={calcRef}
          className={`bg-btn-color sm:bg-transparent transition-all transform duration-1000 px-6 z-10  border-2 border-gray-100 rounded-3xl  py-4 hover:shadow-sm ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'}`}>
          <div className="border-b border-white pb-2">
            <h2 className="text-xl font-bold tracking-tight text-center leading-7 text-gray-900 sm:text-3xl  ">{header.title}</h2>
            <p className="text-center mt-1 text-sm leading-6 text-gray-600">
              {header.subTitle}
            </p>
          </div>

          <div className=" border-b border-white pb-3">
            <div className="mt-4 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6">
              <div className="sm:col-span-full sm:col-start-1 flex">
                {/* {Object.keys(serviceOptions.map((option, key) => (<div className={`${key == 0 ? 'rounded-l-lg' : key ==  ? '' : ''}w-1/3 flex justify-center items-center hover:cursor-pointer text-sm p-1 rounded-l-lg ${orderDetails['Type of Service'] === option ? 'text-gray-200 bg-black' : 'bg-gray-200 text-gray-900'}`} onClick={() => handleTypeOfServiceChange(option)}>{option}</div>)))} */}
                <div className={`w-1/3 flex justify-center items-center hover:cursor-pointer text-sm p-1  rounded-l-lg ${orderDetails['Type of Service'] === 'Writing' ? 'text-gray-200 bg-black' : 'bg-gray-200 text-gray-900'}`} onClick={() => handleTypeOfServiceChange('Writing')}>Writing</div>
                <div className={`w-1/3 flex justify-center items-center hover:cursor-pointer text-sm p-1 border border-x-btn-color ${orderDetails['Type of Service'] === 'Editing' ? 'text-gray-200 bg-black' : 'bg-gray-200 text-gray-900'}`} onClick={() => handleTypeOfServiceChange('Editing')}>Editing</div>
                <div className={`w-1/3 text-center hover:cursor-pointer text-sm p-1 rounded-r-lg ${orderDetails['Type of Service'] === 'Proof Reading' ? 'text-gray-200 bg-black' : 'bg-gray-200 text-gray-900'}`} onClick={() => handleTypeOfServiceChange('Proof Reading')}>Proof Read</div>
              </div>

              <div className="sm:col-span-3">
                <select
                  id="AcademicLevel"
                  name="Academic Level"
                  value={orderDetails['Academic Level']}
                  onChange={handleFormChange}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option disabled selected style={{ display: 'none' }}>Academic Level</option>
                  {
                    academicLevelOptions.map((option) => <option>{option}</option>)
                  }
                </select>
              </div>


              <div className="sm:col-span-3 ">
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

              <div className="sm:col-span-full sm:col-start-1">
                <select
                  id="Subject"
                  name="Subject"
                  value={orderDetails['Subject']}
                  onChange={handleFormChange}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-sm sm:text-sm sm:leading-6"
                >
                  <option disabled selected style={{ display: 'none' }}>Subject</option>
                  {getSubjectOptions().map((subj, idx) => <option key={idx}>{subj}</option>)}
                </select>
              </div>

              <div className="sm:col-span-3 sm:col-start-1">
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

              <div className="sm:col-span-3">
                <select
                  id="Deadline"
                  name="Deadline"
                  value={orderDetails['Deadline']}
                  onChange={handleFormChange}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option disabled selected style={{ display: 'none' }}>Deadline</option>
                  {
                    deadlineOptions.map((option) => <option>{option}</option>)
                  }
                </select>
              </div>

            </div>
            <div className={`flex ${user.discount >= 0 ? 'flex-col' : 'justify-between items-center'} border-t border-white pt-2 mt-2`}>
              <div className={`flex justify-between items-center ${user.discount >= 0 && 'mb-2'}`}>
                {user.discount >= 0 &&
                  <div className='flex items-center gap-x-1'>
                    <span className='text-sm text-white p-2 bg-green-500 rounded-md'>
                      {user.discount}% off
                    </span>
                    <span className='line-through font-bold text-xl'> ${calculatedPrice.toFixed(1)}</span>
                  </div>
                }
                <div className='font-bold text-2xl flex items-center'>🔥 ${isLoading ? (
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
              <Link
                href={'/Orders/new'}
                className='text-center rounded-md px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-900'>
                Place Order
              </Link>
            </div>
          </div >
        </form >
      </div >
    </div >

  )
}

export default Calculator