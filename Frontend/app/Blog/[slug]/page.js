'use client'

import { useContext } from 'react';
import { PostContext } from '@context/PostContext'

const Page = () => {

  const { selectedPost } = useContext(PostContext);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:w-7xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">{selectedPost.title}</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">{selectedPost.date} in {selectedPost.category}</p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7" >
                <p dangerouslySetInnerHTML={{ __html: selectedPost.body }}></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Page