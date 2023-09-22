import React, { useState } from 'react';

const FAQ = () => {
    const [openId, setOpenId] = useState(null);

    const faqs = [
        {
            id: 1,
            question: "What is the FAQ?",
            answer: "FAQ stands for Frequently Asked Questions."
        },
        {
            id: 2,
            question: "How does this accordion work?",
            answer: "The accordion displays the answer upon clicking the respective question."
        },
        {
            id: 3,
            question: "Can I customize the appearance?",
            answer: "Yes, using TailwindCSS, you can customize the appearance as per your requirements."
        }
    ];

    const toggleItem = (id) => {
        if (openId === id) {
            setOpenId(null);
        } else {
            setOpenId(id);
        }
    };

    return (
        <div className='mx-40 bg-gray-50 '>
            {faqs.map(faq => (
                <div key={faq.id} className="mb-4">
                    <button
                        onClick={() => toggleItem(faq.id)}
                        className={`flex justify-between items-center w-full py-3 px-4 text-left font-semibold text-gray-800 hover:text-gray-500 transition dark:text-gray-200 dark:hover:text-gray-400 ${openId === faq.id ? 'text-btn-color' : ''}`}
                    >
                        {faq.question}
                        <svg
                            className={`w-6 h-6 transform transition-transform ${openId === faq.id ? 'rotate-0' : 'rotate-45'}`}
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
    );
};

export default FAQ;
