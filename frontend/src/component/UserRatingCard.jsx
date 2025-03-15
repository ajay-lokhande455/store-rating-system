import React from "react";
import { FaStar } from "react-icons/fa";

const userRatings = [
  {
    id: 1,
    name: "Alice Johnson",
    rating: 5,
    description: "Excellent service and great product quality! Highly recommended."
  },
  {
    id: 2,
    name: "Michael Smith",
    rating: 4,
    description: "Good store, but there is room for improvement in customer service."
  },
  {
    id: 3,
    name: "Samantha Lee",
    rating: 3,
    description: "Average experience. The products are decent but overpriced."
  }
];

const UserRatingCard = () => {
  return (
    <div className="w-full px-6 md:px-12 lg:px-24 py-14">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">User Ratings</h1>
      <p className="text-lg md:text-xl text-gray-500 mt-2">
        See what our customers are saying about our stores
      </p>

      <div className="w-full border-t border-gray-300 my-10"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
        {userRatings.map((user) => (
          <div key={user.id} className="bg-white p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
            <div className="flex items-center my-2">
              {[...Array(user.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <p className="text-gray-700">{user.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRatingCard;
