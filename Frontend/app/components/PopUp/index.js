'use client'
import { fetchData } from '@utils/CMS_Retreival'
import { useEffect, useState } from 'react'

const PopUp = () => {

  const [popUp, setPopUp] = useState({
    'title': '',
    'textColor': '',
    'bgColor': ''
  })

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchData('popUp');
        if (data && data.result && data.result.length > 0) {
          setPopUp((prevData) => ({
            ...prevData,
            'title': data.result[0].title,
            'bgColor': data.result[0].bgColor,
            'textColor': data.result[0].textColor,
          }));
        }
      } catch (error) {
        console.error('Error fetching and setting data:', error);
      }
    };

    fetchDataAndSetState();
  }, []);

  return (
    <div className={`w-full h-fit p-1 ${popUp.bgColor} flex justify-center items-center`}>
      <div className={` text-[#${popUp.textColor}] text-sm font-normal md:text-lg`}>
        {popUp.title} <strong> - now on sale.</strong>
      </div>
    </div >
  )
}

export default PopUp