import Image from "next/image"


const CourseCard = ({ element }) => {
    return (
        <div className="col-span-1 hover:shadow-md flex-col border rounded-lg border-gray-100 p-8 text-gray-900">
            <Image src={element.image}
                width={250}
                height={150}
                loading="lazy"
            />
            <h1>{element.title}</h1>
            <div className="flex justify-between items-center">
                <p>{element.author}</p>
                <p>{element.duration}</p>
            </div>
        </div>
    )
}

const category = ["All", "Graphic Design", "IT", "Language", "Coding", "ART", "Marketing"]
const cardData = [
    {
        "image": "https://thumbs.dreamstime.com/b/machine-deep-learning-algorithms-artificial-intelligence-ai-automation-modern-technology-business-as-concept-134359416.jpg",
        "title": "Photohop for Begineers",
        "author": "Hussain Murtaza",
        "duration": "50Hr"
    }
    , {
        "image": "https://thumbs.dreamstime.com/b/machine-deep-learning-algorithms-artificial-intelligence-ai-automation-modern-technology-business-as-concept-134359416.jpg",
        "title": "Learn Content Writing",
        "author": "Hussain Murtaza",
        "duration": "30Hr"
    }, {
        "image": "https://thumbs.dreamstime.com/b/machine-deep-learning-algorithms-artificial-intelligence-ai-automation-modern-technology-business-as-concept-134359416.jpg",
        "title": "IELTS English Bootcamp",
        "author": "Hussain Murtaza",
        "duration": "125Hr"
    }, {
        "image": "https://thumbs.dreamstime.com/b/machine-deep-learning-algorithms-artificial-intelligence-ai-automation-modern-technology-business-as-concept-134359416.jpg",
        "title": "Intro To Machine Learning",
        "author": "Hussain Murtaza",
        "duration": "90Hr"
    }, {
        "image": "https://thumbs.dreamstime.com/b/machine-deep-learning-algorithms-artificial-intelligence-ai-automation-modern-technology-business-as-concept-134359416.jpg",
        "title": "Intro To Machine Learning",
        "author": "Hussain Murtaza",
        "duration": "90Hr"
    }, {
        "image": "https://thumbs.dreamstime.com/b/machine-deep-learning-algorithms-artificial-intelligence-ai-automation-modern-technology-business-as-concept-134359416.jpg",
        "title": "Intro To Machine Learning",
        "author": "Hussain Murtaza",
        "duration": "90Hr"
    }
]

const FeaturedCourses = () => {
    return (
        <div className="mt-10 mx-6">
            <h1 className="font-bold mb-12 text-center text-4xl">
                Featured Courses
            </h1>
            <div className="flex mb-4 overflow-x-scroll scrollbar-hide">
                {category.map((skill, idx) => {
                    return (
                        <div key={idx} className="p-3 mx-2 rounded-3xl bg-black/10">
                            {skill}
                        </div>
                    )
                })}
            </div>
            <div  className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
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