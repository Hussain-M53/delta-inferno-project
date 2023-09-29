

export const metadata = {
    title: 'Cookie Policy',
    description: 'Our commitment to your privacy',
  }
  

const sections = [
    {
        title: "1. Introduction",
        content: [
            "This Cookie Policy explains how Expert Assignment Nation (\"we,\" \"us,\" or \"our\") uses cookies and similar technologies on our website [https://expertassignmentnation.com/] (\"Website\"). By using our Website, you consent to the use of cookies in accordance with this policy."
        ]
    },
    {
        title: "2. What Are Cookies?",
        content: [
            "Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work efficiently, improve user experience, and provide valuable information to website owners. Cookies cannot be used to identify you personally."
        ]
    },
    {
        title: "3. Types of Cookies We Use",
        content: [
            "a. Essential Cookies: These cookies are necessary for the basic functioning of our Website. They enable you to navigate our site and use its features.",
            "b. Performance Cookies: These cookies collect information about how visitors use our Website, such as which pages are visited most often. This data helps us improve the performance and usability of our site.",
            "c. Functionality Cookies: Functionality cookies allow our Website to remember your preferences, such as language or region, to provide enhanced and personalized features.",
            "d. Analytics Cookies: We use analytics cookies to understand how visitors interact with our site. This information helps us improve our content and user experience."
        ]
    },
    {
        title: "4. How We Use Cookies",
        content: [
            "We use cookies for the following purposes:",
            "To analyze site traffic and usage patterns.",
            "To improve the functionality and performance of our Website.",
            "To remember your preferences and settings.",
            "To provide personalized content and recommendations."
        ]
    },
    {
        title: "5. Managing Cookies",
        content: [
            "You can control and manage cookies in your browser settings. Most browsers allow you to block or delete cookies. However, please note that disabling cookies may impact your experience on our Website."
        ]
    },
    {
        title: "6. Third-Party Cookies",
        content: [
            "We may also use third-party cookies from trusted partners for analytics and advertising purposes. These cookies are subject to the privacy policies of the respective third parties."
        ]
    },
    {
        title: "7. Changes to This Policy",
        content: [
            "We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any updates will be posted on this page with the \"Last Updated\" date."
        ]
    },
    {
        title: "8. Contact Us",
        content: [
            "If you have any questions or concerns about our Cookie Policy, please contact us at [contact@email.com]."
        ]
    }
];

const Page = () => {
  return (
     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-10">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white shadow-lg rounded-lg py-12 px-20 space-y-8 ">
                        <h1 className="text-2xl text-center font-bold mb-4 text-[#3C3A3B]">
                            Cookie Policy
                        </h1>
                        <p className="mb-4 text-[#0E78B9]">Last Updated: [Date]</p>

                        {sections.map((section, idx) => (
                            <div key={idx} className="space-y-4">
                                <h2 className="text-xl font-semibold mb-2 text-[#282425]">{section.title}</h2>
                                {section.content.map((paragraph, pIdx) => (
                                    <p key={pIdx} className="text-[#3C3A3B]">{paragraph}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
  )
}

export default Page