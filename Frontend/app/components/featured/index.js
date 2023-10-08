'use client'
import Image from "next/image"
import { useEffect, useRef, useState } from "react";
import { UserCircleIcon, LightningBoltIcon, PencilIcon, BookOpenIcon,WifiIcon,PlusCircleIcon } from '@heroicons/react/outline';



const CourseCard = ({ element }) => {
    return (
        <div className="p-4 border border-gray-700 bg-transparent hover:bg-cyan-50 hover:border-none text-black ring-1 h-40 flex flex-col justify-center items-center ring-white/10 col-span-1 rounded-lg">
            <div className="mb-4">{element.image}</div>
            <div className="font-semibold text-center text-md">{element.title}</div>
            <div className="font-normal text-sm text-center">{element.subTitle}</div>
        </div>
    )
}

const cardData = [
    {
        "title": "Course Work",
        "image": <UserCircleIcon color='#0E78B9' height={40}  />,
        "subTitle": "120+ courses"
    }
    , {
        "title": "Assignment",
        "image": <LightningBoltIcon color='#0E78B9' height={40}  />,
        "subTitle": "120+ courses"

    }, {
        "title": "Disertation",
        "image": <PencilIcon color='#0E78B9' height={40}  />,
        "subTitle": "120+ courses"
    }, {
        "title": "Literature Review",
        "image": <BookOpenIcon color='#0E78B9' height={40} />,
        "subTitle": "120+ courses"
    }, {
        "title": "Essay",
        "image": <WifiIcon color='#0E78B9' height={40}/>,
        "subTitle": "120+ courses"
    }, {
        "title": "Admission Essay",
        "image": <PlusCircleIcon color='#0E78B9' height={40}  />,
        "subTitle": "120+ courses"
    }, {
        "title": "Case Study",
        "image": <PencilIcon color='#0E78B9' height={40} />,
        "subTitle": "120+ courses"
    }, {
        "title": "Critical Thinking Review",
        "image": <UserCircleIcon color='#0E78B9' height={40} />,
        "subTitle": "120+ courses"
    }, {
        "title": "Marketing Plans",
        "image": <BookOpenIcon color='#0E78B9' height={40} />,
        "subTitle": "120+ courses"
    }, {
        "title": "PPTs and Speech",
        "image": <PlusCircleIcon color='#0E78B9' height={40}  />,
        "subTitle": "120+ courses"
    }, {
        "title": "Research Paper & Proposal",
        "image": <LightningBoltIcon color='#0E78B9' height={40} />,
        "subTitle": "120+ courses"
    }, {
        "title": "Business Plan",
        "image": <WifiIcon color='#0E78B9' height={40}  />,
        "subTitle": "120+ courses"
    }
]


const FeaturedCourses = () => {
    const [isVisible, setIsVisible] = useState(false);
    const coursesRef = useRef();

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
                    {cardData.map((element) => (
                        <CourseCard key={element.title} element={element} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FeaturedCourses;