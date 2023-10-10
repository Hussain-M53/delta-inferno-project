'use client'
import { fetchData } from '@utils/CMS_Retreival';
import React, { useEffect, useState } from 'react';


const FAQ = () => {
    const [openId, setOpenId] = useState(null);
    const [faqs, setFaqs] = useState([]);

    const toggleItem = (id) => {
        if (openId === id) {
            setOpenId(null);
        } else {
            setOpenId(id);
        }
    };
    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                const data = await fetchData('faq');
                if (data && data.result && data.result.length > 0) {
                    setFaqs(data.result.map((item, idx) => ({
                        'id': idx,
                        'question': item.question,
                        'answer': item.answer,
                    })))
                }
            } catch (error) {
                console.error('Error fetching and setting data:', error);
            }
        };

        fetchDataAndSetState();
    }, []);

    return (
        <div>
            <h1 className='text-center font-bold mb-8 text-3xl'>Frequently Asked Questions!</h1>
            <div className='mx-10 md:mx-10 md:grid md:grid-cols-2 md:gap-x-4'>
                {faqs.map(faq => (
                    <div key={faq.id} className={`mb-4 bg-black/5 p-2  ${openId !== faq.id ? 'md:hover:bg-gray-900' : null} rounded-md ring-1 ring-black/10`}>
                        <button
                            onClick={() => toggleItem(faq.id)}
                            className={`flex justify-between items-center w-full py-3 px-4 text-left font-semibold text-gray-800 transition  ${openId === faq.id ? 'text-indigo-600 md:hover:text-indigo-500' : 'md:hover:text-white '}`}
                        >
                            {faq.question}
                            <svg
                                className={`w-6 h-6 transform transition-transform ${openId === faq.id ? 'rotate-45' : 'rotate-0'}`}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2.62421 7.86L13.6242 7.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M8.12421 13.36V2.35999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                        {openId === faq.id && (
                            <div className="mt-3 p-4 bg-gray-100 dark:bg-gray-800 rounded">
                                <p className="text-gray-800 md:hover:text-gray-200">
                                    {faq.answer}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

    );
};

export default FAQ;
