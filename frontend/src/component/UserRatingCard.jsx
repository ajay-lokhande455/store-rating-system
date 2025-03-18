import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRatingsByStore } from "../features/ratingSlice";

const UserRatingCard = () => {
  const { id } = useParams();
  const { ratings } = useSelector((state) => state.rating);
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(getRatingsByStore(id));
  }, [dispatch, id]);

  if (!ratings) return;
  if (ratings.length === 0) return <p>No ratings found.</p>;

  const visibleRatings = showAll ? ratings : ratings.slice(0, 6);

  return (
    <div className="w-full px-6 md:px-12 lg:px-24 py-14">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">User Ratings</h1>
      <p className="text-lg md:text-xl text-gray-500 mt-2">
        See what our customers are saying about our stores
      </p>

      <div className="w-full border-t border-gray-300 my-10"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
        {visibleRatings.map((user) => (
          <div key={user.id} className="bg-white p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">{user.User.name}</h2>
            <div className="flex items-center my-2">
              {[...Array(user.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <p className="text-gray-700">{user.description}</p>
          </div>
        ))}
      </div>

      {ratings.length > 6 && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-4 px-6 py-2 bg-black text-white font-semibold hover:bg-gray-700 transition"
        >
          {showAll ? "Show Less" : "See All Ratings"}
        </button>
      )}
    </div>
  );
};

export default UserRatingCard;
