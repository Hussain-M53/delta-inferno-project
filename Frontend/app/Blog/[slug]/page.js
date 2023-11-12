'use client'
import { formatDate, urlFor } from "@utils/middlewares";
import Image from "next/image";
import { useEffect, useState } from "react"

const Page = ({ params }) => {

  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "blog_post" && _id == "${params.slug}"]`;
        const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        const postData = result.result[0];
        const reshapedPosts = {
          id: postData._id,
          title: postData.title,
          date: formatDate(postData.publishedAt),
          image: postData.mainImage,
          category: postData.category,
          body: postData.body.map(block => {
            if (block._type === 'block') {
              const blockContent = block.children.map(child => {
                let text = child.text;
                if (child.marks && child.marks.length > 0) {
                  child.marks.forEach(mark => {
                    const annotation = block.markDefs.find(def => def._key === mark);
                    if (annotation && annotation._type === 'link') {
                      const target = annotation.blank ? ' target="_blank" rel="noopener noreferrer"' : '';
                      text = `<a href="${annotation.href}" class="text-blue-500 hover:underline"${target}>${text}</a>`;
                    } else if (mark === 'strong') {
                      text = `<strong>${text}</strong>`;
                    } else if (mark === 'em') {
                      text = `<em>${text}</em>`;
                    }
                  });
                }
                return text;
              }).join('');

              let styleTag = 'p';
              let className = '';
              switch (block.style) {
                case 'h1': styleTag = 'h1'; className = 'text-3xl font-bold'; break;
                case 'h2': styleTag = 'h2'; className = 'text-2xl font-bold'; break;
                case 'h3': styleTag = 'h3'; className = 'text-2xl font-bold'; break;
                case 'h4': styleTag = 'h4'; className = 'text-2xl font-bold'; break;
                case 'blockquote': styleTag = 'blockquote'; break;
                // No default case needed as className is initialized as an empty string
              }

              return `<${styleTag} class="${className}">${blockContent}</${styleTag}><br/>`;
            }
            return '';
          }).join(' ')
        }
        setPost(reshapedPosts);

      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
    fetchData();
  }, [params.slug]);




  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:w-7xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed text-3xl">{post.title}</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">{post.date} in {post.category}</p>
              </div>
            </div>
            {post.image &&
              <div className='my-6 h-30 w-auto flex justify-center'>
                <Image
                  src={urlFor(post.image.asset._ref)}
                  width={600}
                  height={250}
                  alt={post.title}
                  priority={true}
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