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
        <div className="grid gap-2 px-20 sm:px-28 sm:flex sm:items-center sm:justify-evenly w-full bg-gray-900 relative md:h-40 py-14">
            {reviews.map((review, idx) => (
                <Review key={idx} {...review} />
            ))}
            <Image src='assests/shape_01.svg' width={70} height={70} className='absolute left-0 top-0' />
            <Image src='assests/shape_01.svg' width={70} height={70} className='absolute right-0 bottom-0' />
            <Image src='assests/shape_123.svg' width={70} height={70} className='absolute right-20 -top-2' />
        </div>
    );
}

export default ReviewCard;
