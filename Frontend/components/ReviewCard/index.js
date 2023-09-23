
const Review = ({ website, rating }) => (
    <div className="p-4 rounded-md bg-white/5 ring-1 ring-white/10">
        <h3 className="text-2xl font-bold text-[#ffffff]">{website}</h3>
        <div className="mt-2 flex items-center">
            <span className="text-xl text-[#ffffff]">{rating} ⭐️</span>
        </div>
    </div>
);

const ReviewCard = () => {
    const reviews = [
        { website: "Sitejabber", rating: 4.5 },
        { website: "ResellerRatings", rating: 5},
        { website: "Reviews.io", rating: 4,  },
    ];

    return (
        <div className="bg-gray-900 p-6 rounded-lg flex justify-evenly my-10 w-3/4 ">
            {reviews.map((review, idx) => (
                <Review key={idx} {...review} />
            ))}
        </div>
    );
}

export default ReviewCard;
