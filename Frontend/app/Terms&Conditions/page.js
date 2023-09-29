
export const metadata = {
  title: 'Terms and Conditions',
  description: 'Our commitment to your trust and understanding',
}

const Page = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 text-[#3C3A3B]">
        <div className="container mx-auto px-6 py-12 bg-white p-8 rounded-lg shadow-md">

            <h1 className="text-4xl font-bold text-center mb-16 text-[#3C3A3B]">Terms and Conditions</h1>

            <p className="mb-8">Last Updated: [Date]</p>
            <p className="mb-6">Agreement between User and [Your Website/Company Name]</p>

            <section className="mb-8">
                <p>The operation of this website ("Website") is managed by [Your Website/Company Name] ("we," "us," or "our"). By accessing and using the Website, you are agreeing to the terms and conditions ("Terms") outlined here. These Terms constitute a binding agreement between you and us. If you do not accept these Terms, please refrain from using the Website.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E78B9]">1. Services Provided</h2>
                <p>We extend academic writing and related services, encompassing tasks such as essay composition, research support, and editing services ("Services"). By utilizing our Services, you signify your compliance with these Terms as well as any supplementary guidelines or regulations we present.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E78B9]">2. Responsibilities of Users</h2>
                <ul className="pl-5 list-disc">
                    <li className="mb-4">It is your obligation to furnish precise and complete information while availing of our Services.</li>
                    <li className="mb-4">You are responsible for providing accurate assignment details, deadlines, and any other relevant information. We are not liable for any consequences resulting from incorrect or incomplete information provided by you.</li>
                    <li className="mb-4">Engaging in unlawful, unethical, or fraudulent activities through our Services is strictly prohibited.</li>
                    <li>When submitting assignments or content, you must not violate the intellectual property rights of others.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E78B9]">3. Order Placement and Payments</h2>
                <ul className="pl-5 list-disc">
                    <li className="mb-4">You are required to place orders for Services via the prescribed channels on our Website.</li>
                    <li className="mb-4">Payment for Services must be settled before any work commences. We reserve the right to decline or cancel orders at our discretion.</li>
                    <li>Service prices are subject to change without notice.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E78B9]">4. Privacy</h2>
                <p>Your use of our Website is also governed by our Privacy Policy. By using our Website, you consent to the collection, use, and sharing of your information as described in our Privacy Policy.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E78B9]">5. Intellectual Property</h2>
                <ul className="pl-5 list-disc">
                    <li className="mb-4">Any content provided through our Services is protected by copyright and other intellectual property laws.</li>
                    <li>You may not reproduce, distribute, modify, or create derivative works based on our content without our explicit written consent.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E78B9]">6. Limitation of Liability</h2>
                <p>Our Services are provided "as is." We make no warranties, express or implied, regarding the accuracy, completeness, or suitability of the content. We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of our Services.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-[#0E78B9]">7. Termination</h2>
                <p>We reserve the right to terminate or suspend your access to our Services at any time without prior notice if you violate these Terms.</p>
            </section>

            <footer className="mt-16 text-center text-sm">
                <p>By using our Services, you agree to the terms outlined in this Privacy Policy.</p>
                <p className="mt-2">Last updated: [Date]</p>
            </footer>
        </div>
    </div>
  )
}

export default Page
