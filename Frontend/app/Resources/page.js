
'use client';
import { useState, useEffect } from 'react';
import { fetchData } from '@utils/CMS_Retreival';

const Page = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                const data = await fetchData('resource');
                if (data && data.result && data.result.length > 0) {
                    setDocuments(data.result.map((item) => ({
                        'title': item.title,
                        'description': item.description,
                        'file': item.file.asset._ref,
                    }))
                    )
                }
            } catch (error) {
                console.error('Error fetching and setting data:', error);
            }
        };

        fetchDataAndSetState();
    }, []);

    const buildUrl = (documentRef) => {
        const [, fileId, extension] = documentRef.match(/file-(.+)-(.+)/) || [];
        return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${fileId}.${extension}`;
    };

    const downloadFile = async (url, fileName) => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const blob = await response.blob();
                const downloadUrl = URL.createObjectURL(blob);
                const aTag = document.createElement('a');
                aTag.href = downloadUrl;
                aTag.download = fileName;
                document.body.appendChild(aTag);
                aTag.click();
                aTag.remove();
                URL.revokeObjectURL(downloadUrl);
            } else {
                throw new Error('Response not OK');
            }
        } catch (error) {
            console.error('Error in downloading file:', error);
        }
    }

    return (
        <div className="mx-auto max-w-7xl p-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Resources For You</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Learn how to grow your business with our expert advice in brand awareness.
                </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 pt-10 sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {documents.map((document, idx) => (
                    <article key={idx} className="hover:bg-cyan-100 shadow-lg flex max-w-lg flex-col items-start justify-between border rounded-lg border-gray-100 p-8">
                        <div className="group relative">
                            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                <div>
                                    <span className="absolute inset-0" />
                                    {document.title}
                                </div>
                            </h3>
                            <div className="mt-5 text-sm text-gray-600 line-clamp-3 ">
                                {document.description}
                            </div>
                        </div>
                        <button className='mt-5 w-full text-center py-2 px-6 border-2 hover:border-orange-500 hover:text-orange-500 hover:bg-transparent rounded-md bg-orange-500 text-white'
                            onClick={() => downloadFile(buildUrl(document.file), document.title)}>
                            Download File
                        </button>

                    </article>
                ))}
            </div>
        </div>
    );
};

export default Page;
