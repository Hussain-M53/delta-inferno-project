
const Review = ({ website, rating }) => (
    <div className="p-4 sm:w-1/3 mx-4 rounded-xl flex items-center justify-between bg-white/5 ring-1 ring-white/10">
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
        <div className='mx-6 flex-col justify-between'>
            <div className="bg-gray-900 grid gap-2 p-6 mx-auto rounded-xl sm:rounded-full sm:flex sm:items-center sm:justify-evenly sm:w-full md:w-9/10 lg:w-4/5">
                {reviews.map((review, idx) => (
                    <Review key={idx} {...review} />
                ))}
            </div>
        </div>
    );
}

export default ReviewCard;
