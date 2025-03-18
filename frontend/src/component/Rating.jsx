import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreById } from "../features/storeSlice";
import { getRatingsByStore, submitRating } from "../features/ratingSlice"; 
import { toast } from "react-toastify";

const Rating = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedStore: storeDetails, loading, error } = useSelector((state) => state.stores);
  const { loading: ratingLoading } = useSelector((state) => state.rating);
  const [userRating, setUserRating] = useState(null);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchStoreById(id));
  }, [dispatch, id]);

  const handleRatingSubmit = (rating) => {
    setUserRating(rating);
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please log in to submit a rating.");
      return;
    }

    if (user.role !== 'user') {
      toast.error("You are not allowed to submit a rating.");
      return;
    }

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
      toast.success("Thank you for your feedback! Your rating has been submitted.");
    }
  };

  if (loading) return <p>Loading store details...</p>;
  if (error) return <p className="text-red-500">Failed to load store details. Please try again later.</p>;
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
        <p className="text-lg md:text-xl text-gray-500 mt-1">Address: {storeDetails.address}</p>
        <p className="text-lg md:text-xl text-gray-500 mt-1">Overall Rating: {storeDetails.total_ratings}+</p>
        
        {/* Display Average Rating */}
        <div className="flex items-center mt-4 space-x-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-3xl ${i < Math.round(storeDetails?.rating || 0) ? "text-yellow-500" : "text-gray-300"}`}
            />
          ))}
          <span className="ml-2 text-lg">{(storeDetails?.rating || 0).toFixed(1)} / 5</span>
        </div>

        <div className="w-full border-t border-gray-300 my-4"></div>

        {/* Rating Form */}
        <h2 className="text-2xl font-semibold text-gray-900">Rate This Store</h2>
        <div className="flex items-center mt-2 space-x-2">
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
      </div>
    </div>
  );
};

export default Rating;
