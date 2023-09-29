
export const metadata = {
  title: 'Refund Policy',
  description: 'Built on Next 13',
}


const sections = [
  {
      title: "1. Refund Policy Overview",
      content: [
          "At Expert Assignment Nation, we are dedicated to providing exceptional academic writing and related services. This Refund Policy outlines the circumstances under which refunds may be considered and includes policies related to client accounts."
      ]
  },
  {
      title: "2. Refund Eligibility",
      content: [
          "We do not offer full refunds under any circumstances. However, we offer partial refunds under the following situations:"
      ]
  },
  {
      title: "3. Late Delivery",
      content: [
          "If your assignment is delivered late, and this delay impacts your ability to use the work, please reach out to our support team. We will discuss the extent of the delay and any resulting issues, and determine an appropriate refund amount, if applicable."
      ]
  },
  {
      title: "4. Unmet Grade Expectations",
      content: [
          "At Expert Assignment Nation, we provide academic assistance to help improve your educational performance. However, we do not guarantee specific grades or outcomes. Our experts work diligently to meet your assignment requirements, but the final evaluation by your institution or instructor is beyond our control.",
          "If you receive a grade lower than what you expected on the assignment completed by our experts, we do not offer refunds solely based on the grade received. We encourage clients to view our services as a resource for enhancing their understanding of the subject matter and improving their academic skills.",
          "Please note that our refund policy still applies to other situations outlined in this policy, such as late delivery or assignments scoring less than 40%. Refunds in those cases will be considered based on the criteria provided.",
          "This policy is intended to clarify our stance on grade guarantees and to manage client expectations regarding our services."
      ]
  },
  {
      title: "5. Assignment Scoring Less than 40%",
      content: [
          "In the event that you receive a score of less than 40% on any assignment completed by our experts, we will consider your request for a refund. Please provide proof of the assignment's score, and we will assess your request individually."
      ]
  },
  {
      title: "6. Account-Related Refunds",
      content: [
          "a. Account Deactivation: If you choose to deactivate your account, please note that there are no refunds for account deactivation.",
          "b. Expired Account: If your account remains inactive for more than 180 days from the last payment date, it will be considered expired and deleted. Along with your account, all personal data processed by the Company will be erased. No refunds will be provided for expired accounts.",
          "c. Account Deletion: You may request to delete your account anytime, by clicking the deactivate button in your account settings. However, there are no refunds for account deletion."
      ]
  },
  {
      title: "7. Refund Process",
      content: [
          "a. Client's Responsibility: To initiate a refund request, please contact our support team at support@expertassignmentnation.com. Include your order number, a description of the issue, and any relevant documentation.",
          "b. Review and Decision: Once we receive your refund request, our team will review the provided documentation and circumstances. We will assess whether the situation warrants a partial refund.",
          "c. Notification: We will notify you of our decision regarding your refund request within [X] business days of receiving your request and all necessary documentation."
      ]
  },
  {
      title: "8. Refund Limitations",
      content: [
          "a. Non-Eligible Situations: Refunds will not be granted for reasons other than the quality of the assignment, such as change of mind, order cancellation, or any other non-performance-related reasons.",
          "b. Partial Refunds: If your refund request is approved, you will receive a partial refund, the amount of which will depend on the specific circumstances of your request. The refund will be processed using the same payment method that was used for the original order.",
          "c. Refund Denial: We reserve the right to deny refund requests that do not meet the eligibility criteria outlined in this policy."
      ]
  },
  {
      title: "9. Contact Us",
      content: [
          "If you have any questions or concerns about our refund policy, please contact us at support@expertassignmentnation.com. We are here to assist you and address any issues you may encounter with our services."
      ]
  }
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-8">
          <h1 className="text-2xl font-bold mb-4 text-[#3C3A3B]">
            Refund Policy
          </h1>
          <p className="mb-4 text-gray-600">Last Updated: [Date]</p>

          {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              {section.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-[#282425]">{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
