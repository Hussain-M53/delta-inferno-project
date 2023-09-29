
export const metadata = {
  title: 'Plagiarism Policy - EAN',
  description: 'Built on Next 13',
}

const sections = [
  {
      title: "1. Introduction",
      content: [
          "At Expert Assignment Nation, we are committed to upholding academic integrity and ensuring that all our services are provided in an ethical manner. This Plagiarism Policy outlines our stance on plagiarism and how we handle instances of plagiarism within the work we provide."
      ]
  },
  {
      title: "2. Definition of Plagiarism",
      content: [
          "Plagiarism is the act of presenting someone else's ideas, words, research, or work as your own without proper citation or attribution. It is a serious violation of academic and ethical standards and can lead to severe consequences, including academic penalties and damage to one's reputation."
      ]
  },
  {
      title: "3. Our Commitment to Plagiarism-Free Work",
      content: [
          "We take plagiarism seriously and have a zero-tolerance policy for any form of plagiarism within the work we provide. Our commitment to delivering plagiarism-free work is as follows:",
          "a. Originality: Our team of experts is dedicated to producing original and unique content for every assignment. We do not reuse or recycle content from previous projects.",
          "b. Citation and Referencing: When incorporating external sources or references, our experts ensure proper citation and referencing according to the specified citation style (e.g., APA, MLA, Chicago)."
      ]
  },
  {
      title: "4. Client Responsibility",
      content: [
          "While we strive to provide plagiarism-free work, clients must also uphold their responsibility to maintain academic integrity. Clients are expected to use the work we provide as a reference or learning tool and to follow all relevant academic guidelines and honor codes."
      ]
  },
  {
      title: "5. Plagiarism Checks",
      content: [
          "We employ plagiarism detection tools to verify the originality of the work we deliver to our clients. This helps ensure that the work meets academic standards and is free from any form of plagiarism."
      ]
  },
  {
      title: "6. Reporting Plagiarism",
      content: [
          "If a client suspects that the work we provided contains plagiarism or if they have concerns about the originality of the content, they should immediately contact our support team at support@expertassignmentnation.com."
      ]
  },
  {
      title: "7. Plagiarism Resolution",
      content: [
          "a. Investigation: Upon receiving a report of suspected plagiarism, we will conduct a thorough investigation into the matter. This may involve reviewing the client's concerns, the originality report, and consulting with the expert responsible for the assignment.",
          "b. Resolution: If plagiarism is confirmed, we will take appropriate action, which may include revising the work to remove any plagiarized content or offering a partial refund to the client. The nature of the resolution will depend on the specific circumstances of the case."
      ]
  },
  {
      title: "8. Education and Prevention",
      content: [
          "We believe in educating our clients about the importance of academic integrity and how to avoid unintentional plagiarism. We provide guidelines and resources on proper citation and referencing practices to help clients maintain ethical standards in their academic work."
      ]
  },
  {
      title: "9. Conclusion",
      content: [
          "Expert Assignment Nation is committed to providing high-quality, plagiarism-free work to assist clients in their academic pursuits. We uphold the highest standards of academic integrity and expect our clients to do the same."
      ]
  }
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-8">
          <h1 className="text-2xl font-bold mb-4 text-[#3C3A3B]">
            Plagiarism Policy
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