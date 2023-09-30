import Image from "next/image"


const CourseCard = ({ element }) => {
    return (    
        <div className="bg-gray-900 hover:bg-gray-700 text-white ring-1 h-36 flex justify-center items-center ring-white/10 col-span-1 rounded-lg">
            <h1 className="font-semibold text-center text-lg">{element.title}</h1>
        </div>
    )
}

const category = ["All", "Graphic Design", "IT", "Language", "Coding", "ART", "Marketing"]
const cardData = [
    {
        "title": "Course Work",
    }
    , {
        "title": "Assignment",
    }, {
        "title": "Disertation",
    }, {
        "title": "Literature Review",
    }, {
        "title": "Essay",
    }, {
        "title": "Admission Essay",
    }, {
        "title": "Case Study",
    }, {
        "title": "Critical Thinking Review",
    }, {
        "title": "Marketing Plans",
    }, {
        "title": "PPTs and Speech",
    }, {
        "title": "Research Paper & Proposal",
    }, {
        "title": "Business Plan",
    }
]

const FeaturedCourses = () => {
    return (
        <div className="mx-6">
            <h1 className="font-bold mb-12 text-center text-4xl">
                Our Services
            </h1>
            <div className="flex mb-4 overflow-x-scroll scrollbar-hide">
                {category.map((skill, idx) => {
                    return (
                        <div key={idx} className="p-3 mx-2 rounded-xl bg-black/5">
                            {skill}
                        </div>
                    )
                })}
            </div>
            <div className=" grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {
                    cardData.map((element) => {
                        return (
                            <CourseCard key={element.title} element={element} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FeaturedCourses