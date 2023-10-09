'use client'
import Image from "next/image"
import { useEffect, useRef, useState } from "react";
import { UserCircleIcon, LightningBoltIcon, PencilIcon, BookOpenIcon, WifiIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { fetchData } from "@utils/CMS_Retreival";



const CourseCard = ({ element, icon }) => {
    return (
        <div className="p-4 border border-gray-700 bg-transparent hover:bg-cyan-50 hover:border-none text-black ring-1 h-40 flex flex-col justify-center items-center ring-white/10 col-span-1 rounded-lg">
            {element.icon ? <Image src={`${element.icon}`} height={40} width={40} /> : <div className="mb-4">{icon}</div>}
            <div className="font-semibold text-center text-md">{element.title}</div>
            <div className="font-normal text-sm text-center">{element.subTitle}</div>
        </div>
    )
}




const FeaturedCourses = () => {

    const icons = [
        <UserCircleIcon color='#0E78B9' height={40} />,
        <LightningBoltIcon color='#0E78B9' height={40} />,
        <PencilIcon color='#0E78B9' height={40} />,
        <BookOpenIcon color='#0E78B9' height={40} />,
        <WifiIcon color='#0E78B9' height={40} />,
        <PlusCircleIcon color='#0E78B9' height={40} />,
    ]

    const [isVisible, setIsVisible] = useState(false);
    const coursesRef = useRef();
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                setIsVisible(entry.isIntersecting);
            });
        }, { threshold: 0.5 });

        if (coursesRef.current) {
            observer.observe(coursesRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                const data = await fetchData('service');
                if (data && data.result && data.result.length > 0) {
                    setCardData(data.result.map((item) => ({
                        'title': item.title,
                        'icon': item.icon,
                        'description': item.description,
                    })))
                }
            } catch (error) {
                console.error('Error fetching and setting data:', error);
            }
        };

        fetchDataAndSetState();
    }, []);

    return (
        <div
            className={'mx-6'}
        >
            <h1 className="font-bold mb-12 text-center text-4xl">
                Our Services
            </h1>
            <div ref={coursesRef}
                className={`transition-all transform duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {cardData.map((element, idx) => (
                        <CourseCard key={idx} icon={icons[idx % icons.length]} element={element} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FeaturedCourses;