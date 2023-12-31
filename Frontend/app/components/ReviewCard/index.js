import Image from "next/image";

const Review = ({ website, rating }) => (
    <div className="z-10 p-4 sm:w-1/3 mx-4 text-center rounded-xl sm:flex sm:items-center sm:justify-between  bg-white/5 ring-1 ring-white/10">
        <h3 className="sm:text-lg md:text-xl lg:text-2xl font-bold text-[#ffffff]">{website}</h3>
        <span className="sm:text-md md:text-lg lg:text-xl text-[#ffffff]">{rating}⭐️</span>
    </div>
);

const ReviewCard = () => {
    const reviews = [
        { website: "Sitejabber", rating: 4.5 },
        { website: "ResellerRatings", rating: 5 },
        { website: "Reviews.io", rating: 4, },
    ];

    return (
        <div className="md:px-10 lg:px-20 py-8 sm:py-10 flex items-center justify-evenly w-full bg-gray-900 relative">
            {reviews.map((review, idx) => (
                <Review key={idx} {...review} />
            ))}
            <Image src='/assets/shape_01.svg' width={70} height={70} className='absolute left-0 top-0' />
            <Image src='/assets/shape_01.svg' width={70} height={70} className='absolute right-0 bottom-0' />
            <Image src='/assets/shape_123.svg' width={70} height={70} className='absolute right-0 sm:right-20 -top-2' />
            <Image src='/assets/bg-13.png' width={1000} height={1000} className='absolute inset-y-0' />

        </div>
    );
}

export default ReviewCard;
