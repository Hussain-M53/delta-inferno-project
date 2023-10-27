'use client'
import { formatDate, urlFor } from "@utils/middlewares";
import Image from "next/image";
import { useEffect, useState } from "react"

const Page = ({ params }) => {

  const [post, setPost] = useState({});

  useEffect(() => {

    const fetchData = async () => {
      try {
        const query = `*[_type == "service_post" && _id == "${params.slug}"]`;
        const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        const reshapedPosts = {
          id: result.result[0]._id,
          title: result.result[0].title,
          date: formatDate(result.result[0].publishedAt),
          image: result.result[0].mainImage,
          body: result.result[0].body.map(block => {
            if (block._type === 'block') {
              return block.children.map(child => {
                let text = child.text;
                let styleTag = 'p';
                let className;
                if (block.style) {
                  switch (block.style) {
                    case 'h1': styleTag = 'h1'; className = 'text-3xl font-bold'; break;
                    case 'h2': styleTag = 'h2'; className = 'text-2xl font-bold'; break;
                    case 'h3': styleTag = 'h3'; className = 'text-2xl font-bold'; break;
                    case 'h4': styleTag = 'h4'; className = 'text-2xl font-bold'; break;
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
        setPost(reshapedPosts);

      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
    fetchData();
  }, []);



  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:w-7xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed text-3xl">{post.title}</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">{post.date}</p>
              </div>
            </div>
            {post.image &&
              <div className='my-6 flex justify-center'>
                <Image
                  src={urlFor(post.image.asset._ref)}
                  width={600}
                  height={250}
                  alt={post.title}
                />
              </div>
            }
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7" >
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Page