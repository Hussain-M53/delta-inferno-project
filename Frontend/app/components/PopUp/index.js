'use client'
import { useEffect, useState } from 'react'

const PopUp = () => {

  const [popUp, setPopUp] = useState({
    'title': 'We bring to you 10% offer',
    'textColor': '',
    'bgColor': 'bg-btn-color'
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = '*[_type == "popUp"]';
        const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();

        setPopUp({
          ...prev,
          'title': result.result.title,
          'bgColor': result.result.bgColor,
          'textColor': result.result.textColor,

        });
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchData();
  }, [])

  return (
    <div className={`w-full h-fit p-1 ${popUp.bgColor} flex justify-center items-center`}>
      <div className={` text-[#${popUp.textColor}] text-sm font-normal md:text-lg`}>
        {popUp.title} <strong>now on sale.</strong>
      </div>
    </div >
  )
}

export default PopUp