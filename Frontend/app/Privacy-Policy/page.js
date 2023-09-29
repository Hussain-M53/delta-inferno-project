
export const metadata = {
  title: 'Privacy Policy - EAN',
  description: 'Our commitment to your privacy',
}

const Page = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 text-[#3C3A3B]">
        <div className="container mx-auto px-6 py-12 bg-white p-8 rounded-lg shadow-md">

            <h1 className="text-4xl font-bold text-center mb-16 text-[#3C3A3B]">Privacy Policy</h1>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E78B9]">1. Information Collected</h2>
                <ul className="pl-5 list-disc">
                    <li className="mb-4">Personal Information: This includes your name, email address, contact details, shipping and billing address, and other information you provide during registration or while making a purchase.</li>
                    <li className="mb-4">Order Details: Specifics about the services you purchase from us, such as transaction history, order numbers, and order value.</li>
                    <li className="mb-4">Bank Details: If you decide to use our website to make payments, we will collect the data needed to securely process those payments, including your credit/debit card number, bank account number, and other payment information. Please be aware that we don't keep entire credit card numbers on our servers.</li>
                    <li>Cookies and Usage Data: We use cookies and similar tracking technologies to collect information about your browsing behavior and interaction with our website. This may include your IP address, browser type, pages visited, referring URL, and other analytics data.</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E78B9]">2. How We Use the Information</h2>
                <p>We use the collected information for the following purposes:</p>
                <ul className="pl-5 list-disc">
                    <li className="mb-4">Order Processing: We use your personal information and order details to process your orders, arrange delivery, and communicate with you about your purchases.</li>
                    <li className="mb-4">Payment Processing: Your bank details are used solely for processing payments and preventing fraudulent transactions. We do not store complete payment information on our servers.</li>
                    <li className="mb-4">Communication: We may use your email address to send order confirmations, updates, and relevant information about our services. You can opt-out of promotional emails at any time.</li>
                    <li>Improvement and Personalization: We analyze usage data and cookies to improve our website's functionality, user experience, and content. This helps us tailor our offerings to better suit your preferences.</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E78B9]">3. Cookies</h2>
                <p>We use cookies and similar technologies to collect data about your interactions with our website. Cookies are small files stored on your device that allow us to recognize your browser and capture certain information. You can control or delete cookies through your browser settings. For more information, please refer to our Cookie Policy [if applicable].</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E78B9]">4. Data Deletion Request</h2>
                <p>You have the right to request the deletion of your personal information from our records. To do so, please send an email to [email address]. We will respond to your request within [timeframe] and process the deletion as required by applicable laws.</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E78B9]">5. Disclosure of Information</h2>
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your explicit consent, except as required by law or as necessary to fulfill our services (e.g., sharing your address with a shipping provider).</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E78B9]">6. Security</h2>
                <p>We implement appropriate security measures to protect the personal information we collect. However, no data transmission over the internet or storage system can be guaranteed to be 100% secure. Please note that you provide information to us at your own risk.</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E78B9]">7. Changes to the Privacy Policy</h2>
                <p>We reserve the right to update this Privacy Policy at any time. Changes will be effective immediately upon posting on our website.</p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E78B9]">Contact Us</h2>
                <p>If you have any questions, concerns, or requests regarding your personal information or this Privacy Policy, please contact us at [contact details].</p>
            </section>

            <footer className="mt-16 text-center text-sm">
                <p>By using our website, you agree to the terms outlined in this Privacy Policy.</p>
                <p className="mt-2">Last updated: [Date]</p>
            </footer>
        </div>
    </div>
  )
}

export default Page
