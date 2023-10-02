'use client'
import { ArrowCircleRightIcon } from '@heroicons/react/outline';
import Link from "next/link";
import { useEffect, useState, useContext } from 'react';
import { formatDate } from '../utils/middlewares'
import { PostContext } from '@context/PostContext'

// const posts = [
//   {
//     id: 1,
//     title: 'Boost your conversion rate',
//     href: '#',
//     description:
//       'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//     date: 'Mar 16, 2020',
//     datetime: '2020-03-16',
//     category: { title: 'Marketing', href: '#' },
//   },
//   {
//     id: 2,
//     title: 'Boost your conversion rate',
//     href: '#',
//     description:
//       'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//     date: 'Mar 16, 2020',
//     datetime: '2020-03-16',
//     category: { title: 'Marketing', href: '#' },
//   },
//   {
//     id: 3,
//     title: 'Boost your conversion rate',
//     href: '#',
//     description:
//       'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//     date: 'Mar 16, 2020',
//     datetime: '2020-03-16',
//     category: { title: 'Marketing', href: '#' },
//   },
//   {
//     id: 4,
//     title: 'Boost your conversion rate',
//     href: '#',
//     description:
//       'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//     date: 'Mar 16, 2020',
//     datetime: '2020-03-16',
//     category: { title: 'Marketing', href: '#' },
//   }
// ]

const Page = () => {

  const [posts, setPosts] = useState([]);
  const { setSelectedPost } = useContext(PostContext);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const query = '*[_type == "post"]';
        const url = `https://qjbj0yv5.api.sanity.io/v1/data/query/production?query=${encodeURIComponent(query)}`;

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

                  text = `<${styleTag} className = 'font-bold'>${text}</${styleTag}>`;

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
    <div className="bg-white py-24 sm:py-32 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Blogs For You</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice in brand awareness.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post, idx) => (
            <article key={idx} className="shadow-lg flex max-w-xl flex-col items-start justify-between border rounded-lg border-gray-100 p-8">
              <div className="flex items-center gap-x-4 text-xs">
                <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                  {post.category}
                </div>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <div >
                    <span className="absolute inset-0" />
                    {post.title}
                  </div>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600" >{post.body} </p>
              </div>
              <div className='w-full flex mt-6 justify-between items-center'>
                <time dateTime={post.datetime} className="text-gray-500 text-xs">
                  {post.date}
                </time>
                <Link onClick={() => setSelectedPost(post)} href={`/Blog/${encodeURIComponent(post.id)}`}>
                  <ArrowCircleRightIcon height={40} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div >
  )
}

export default Page