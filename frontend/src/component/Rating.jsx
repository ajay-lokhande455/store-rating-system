import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreById } from "../features/storeSlice";
import { submitRating, getRatingsByStore } from "../features/ratingSlice"; 

const Rating = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedStore: storeDetails, loading, error } = useSelector((state) => state.stores);
  const { ratings, loading: ratingLoading, error: ratingError } = useSelector((state) => state.rating);

  const [userRating, setUserRating] = useState(null);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchStoreById(id));
    // dispatch(getRatingsByStore(id));
  }, [dispatch, id]);

  const handleRatingSubmit = (rating) => {
    setUserRating(rating);
  };

  const handleSubmit = async () => {
    if (userRating && review.trim()) {
      await dispatch(
        submitRating({
          user_id: user.id, 
          store_id: id,
          rating: userRating,
          description: review,
        })
      );
      setSubmitted(true);
      setAlertMessage("Thank you for your feedback! Your rating has been submitted.");
      
      // Hide alert after 3 seconds
      setTimeout(() => setAlertMessage(null), 3000);

      // dispatch(getRatingsByStore(id));
    }
  };

  if (loading) return <p>Loading store details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!storeDetails) return <p>Store not found.</p>;

  return (
    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-24 py-10 flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2 flex justify-center">
        <img
          src={storeDetails.image}
          alt={storeDetails.name}
          className="w-full max-w-sm md:max-w-md shadow-md"
        />
      </div>

      <div className="md:w-1/2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{storeDetails.name}</h1>
        <p className="text-lg md:text-xl text-gray-500 mt-2">Address: {storeDetails.address}</p>
        <p className="text-lg md:text-xl text-gray-500 mt-2">Overall Rating: {storeDetails.total_ratings}+</p>

        <div className="w-full border-t border-gray-300 my-6"></div>

        <h2 className="text-2xl font-semibold text-gray-900">Rate This Store</h2>
        <div className="flex items-center mt-4 space-x-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`cursor-pointer text-3xl transition-all ${userRating > i ? "text-yellow-500" : "text-gray-300"}`}
              onClick={() => handleRatingSubmit(i + 1)}
            />
          ))}
        </div>

        <textarea
          className="w-full border p-2 mt-4 rounded"
          rows="3"
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={userRating === null || review.trim() === "" || ratingLoading}
            className={`mt-4 px-6 py-2 text-white font-semibold transition ${
              userRating && review.trim() ? "bg-black hover:bg-gray-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {ratingLoading ? "Submitting..." : "Submit Rating"}
          </button>
        ) : (
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-6 py-2 bg-amber-500 text-white font-semibold hover:bg-amber-600 transition"
          >
            Modify Your Rating
          </button>
        )}

        {/* Success Alert Message */}
        {alertMessage && (
          <div className="mt-4 px-4 py-2 bg-green-100 text-green-700 border border-green-400 rounded">
            {alertMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rating;
