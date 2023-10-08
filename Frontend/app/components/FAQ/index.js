'use client'
import React, { useState } from 'react';

const faqs = [
    {
        id: 1,
        question: "How do I place an order?",
        answer: "To place an order, simply provide your assignment details using the contact form. Our team will guide you through the order process from there."
    },
    {
        id: 2,
        question: "How can I make a payment for my order?",
        answer: "Once we receive your assignment details, we will send you a payment link to your registered communication device. Follow the link to make a secure payment."
    },
    {
        id: 3,
        question: "What types of assignments can you assist with?",
        answer: "We specialize in university-level essays across a wide range of subjects and degrees."
    },
    {
        id: 4,
        question: " Is my assignment checked for plagiarism?",
        answer: " Yes, each assignment undergoes a comprehensive plagiarism check to ensure its originality."
    },
    {
        id: 5,
        question: "How long will it take to receive my completed assignment?",
        answer: "You can select a delivery timeline based on your preferences, and the price will reflect that choice. We strive to meet your chosen deadline."
    },
    {
        id: 6,
        question: "Is my personal information kept confidential?",
        answer: " Absolutely, we take your privacy seriously and maintain strict confidentiality measures."
    },
    {
        id: 7,
        question: "How can I contact your support team for further assistance?",
        answer: "For any further assistance, feel free to contact our support team at support@expertassignmentnation.com. We're here to assist you with any questions or concerns."
    },
    {
        id: 8,
        question: "Can I request a specific writer for my assignment?",
        answer: "While we cannot guarantee specific writers, you can share your preferences during the order process. We'll do our best to match you with a suitable writer."
    }
];

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
                    data.result.map((item, idx) => {
                        setFaqs((prevData) => ({
                            ...prevData,
                            'id': idx,
                            'question': item.question,
                            'answer': item.answer,
                        }));
                    });
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
                            className={`flex justify-between items-center w-full py-3 px-4 text-left font-semibold text-gray-800 transition dark:text-gray-200  ${openId === faq.id ? 'text-indigo-600 md:hover:text-indigo-500' : 'md:dark:hover:text-gray-400 md:hover:text-white '}`}
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
                                <p className="text-gray-800 dark:text-gray-200">
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
