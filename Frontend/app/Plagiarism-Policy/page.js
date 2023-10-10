'use client'
import { useEffect, useState } from "react";
import { fetchData } from '@utils/CMS_Retreival';

// export const metadata = {
//   title: 'Plagiarism Policy - EAN',
//   description: 'Built on Next 13',
// }



const Page = () => {
  const [content, setContent] = useState({});
  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const result = await fetchData('plagiarismPage');
        if (result && result.result && result.result.length > 0) {
          const reshapedPosts = {
            title: result.result[0].title,
            body: result.result[0].body.map(block => {
              if (block._type === 'block') {
                return block.children.map(child => {
                  let text = child.text;
                  let styleTag = 'p';
                  let className;
                  if (block.style) {
                    switch (block.style) {
                      case 'h1': styleTag = 'h1'; className = 'text-3xl font-bold text-btn-color'; break;
                      case 'h2': styleTag = 'h2'; className = 'text-2xl font-bold text-btn-color'; break;
                      case 'h3': styleTag = 'h3'; className = 'text-2xl font-bold text-btn-color'; break;
                      case 'h4': styleTag = 'h4'; className = 'text-xl font-bold text-btn-color'; break;
                      case 'blockquote': styleTag = 'blockquote'; break;
                      default: className = '';
                    }
                  }

                  text = `<${styleTag} class="${className}">${text}</${styleTag}><br />`;

                  if (child.marks && child.marks.length > 0) {
                    child.marks.forEach(mark => {
                      switch (mark) {
                        case 'strong': text = `<strong>${text}</strong>`; break;
                        case 'em': text = `<em>${text}</em>`; break;
                      }
                    });
                  }

                  return text;
                }).join('\n')
              }
              return '';
            }).join('\n')
          }
          setContent(reshapedPosts);
        }
      } catch (error) {
        console.error('Error fetching and setting data:', error);
      }
    }

    fetchDataAndSetState();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-12 text-[#3C3A3B]">
      <div className="container mx-auto px-6 py-12 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center mb-16 text-[#3C3A3B]">{content.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content.body }} />
      </div>
    </div>
  )
}

export default Page