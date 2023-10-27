'use client'
import { ArrowCircleRightIcon } from '@heroicons/react/outline';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { formatDate } from '../utils/middlewares'

const Page = () => {

  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(3);

  const showMorePosts = () => {
    setVisiblePosts((prevValue) => prevValue + 3);
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const query = '*[_type == "service_post"]';
        const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        const reshapedPosts = result.result.map(post => {
          return {
            id: post._id,
            title: post.title,
            date: formatDate(post.publishedAt),
            category: post.category,
            body: post.body.map(block => {
              if (block._type === 'block') {
                return block.children.map(child => {
                  let text = child.text;
                  let styleTag = 'p';

                  if (block.style) {
                    switch (block.style) {
                      case 'h1': styleTag = 'h1'; break;
                      case 'h2': styleTag = 'h2'; break;
                      case 'h3': styleTag = 'h3'; break;
                      case 'h4': styleTag = 'h4'; break;
                      case 'blockquote': styleTag = 'blockquote'; break;
                    }
                  }

                  text = `<${styleTag}>${text}</${styleTag}>`;

                  if (child.marks && child.marks.length > 0) {
                    child.marks.forEach(mark => {
                      switch (mark) {
                        case 'strong': text = `<strong>${text}</strong>`; break;
                        case 'em': text = `<em>${text}</em>`; break;
                      }
                    });
                  }

                  return text;
                }).join('')
              }
              return '';
            }).join('')
          };
        });
        setPosts(reshapedPosts);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };


    fetchData();
  }, []);



  return (
    <div className="bg-white mb-10">
      <div className='bg-orange-500 w-full h-48 mb-4'>
        {/* <Image
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp2MmX0Rm5Bj9eVREqcsU8QUXiZN2pN0g2Pg&usqp=CAU'
          width={700}
          height={100}
          alt='Banner Image'
        /> */}
      </div>

      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Services For You</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice in brand awareness.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 pt-10 sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.slice(0, visiblePosts).map((post, idx) => (
            <article key={idx} className="hover:bg-cyan-100 shadow-lg flex max-w-xl flex-col items-start justify-between border rounded-lg border-gray-100 p-8">
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <div >
                    <span className="absolute inset-0" />
                    {post.title}
                  </div>
                </h3>
                <div
                  className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3 "
                  dangerouslySetInnerHTML={{ __html: post.body }} />
              </div>
              <div className='w-full flex mt-6 justify-between items-center'>
                <time dateTime={post.datetime} className="text-gray-500 text-xs">
                  {post.date}
                </time>
                <Link href={`/Services/${encodeURIComponent(post.id)}`} className='hover:text-gray-600'>
                  <ArrowCircleRightIcon height={40} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {visiblePosts < posts.length && ( // Only show this button if there are more posts to load
        <div className="flex justify-end mx-16">
          <button
            onClick={showMorePosts}
            className="mt-8 px-4 py-1 text-lg font-medium rounded-md text-white bg-btn-color hover:bg-cyan-400"
          >
            Show More
          </button>
        </div>
      )}
    </div >
  )
}

export default Page