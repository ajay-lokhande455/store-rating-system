import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const storeDetails = {
  id: 1,
  name: "Tech Haven",
  address: "123 Main Street, New York, NY",
  overallRating: 4.5,
  image:
    "https://imgs.search.brave.com/US2ZKToTB2iPCdJCSOWNRtmUgJ2wo5HXUey4iH6ydeY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMy/OTM4NDYxNS9waG90/by9zYWxlc3dvbWFu/LXNob3dpbmctYS1u/ZXctbW9iaWxlLXBo/b25lLXRvLWhlci1j/b2xsZWFndWUuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPWo4/blBZT2xPZW9QMmJM/NmtacE5MREF0dGxu/bFVPM3llazNRUDZE/bzUxMGc9",
};

const Rating = () => {
  const { id } = useParams();
  const [userRating, setUserRating] = useState(null);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleRatingSubmit = (rating) => {
    setUserRating(rating);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    alert(`Thank you for your rating: ${userRating} ★\nReview: ${review}`);
  };

  return (
    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-24 py-10 flex flex-col md:flex-row gap-6">
      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src={storeDetails.image}
          alt={storeDetails.name}
          className="w-full max-w-sm md:max-w-md  shadow-md"
        />
      </div>

      <div className="md:w-1/2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {storeDetails.name}
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mt-2">
          Address: {storeDetails.address}
        </p>
        <p className="text-lg md:text-xl text-gray-500 mt-2">
          Overall Rating: {storeDetails.overallRating} ★
        </p>

        <div className="w-full border-t border-gray-300 my-6"></div>

        {/* Rating Section */}
        <h2 className="text-2xl font-semibold text-gray-900">Rate This Store</h2>
        <div className="flex items-center mt-4 space-x-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`cursor-pointer text-3xl transition-all ${
                userRating > i ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => handleRatingSubmit(i + 1)}
            />
          ))}
        </div>

        {/* Review Textarea */}
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
            disabled={userRating === null || review.trim() === ""}
            className={`mt-4 px-6 py-2 text-white font-semibold transition ${
              userRating && review.trim()
                ? "bg-black hover:bg-gray-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit Rating
          </button>
        ) : (
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-6 py-2 bg-amber-500 text-white font-semibold hover:bg-amber-600 transition"
          >
            Modify Your Rating
          </button>
        )}

        {submitted && (
          <div className="mt-4 p-4 bg-gray-100 rounded shadow-sm">
            <p className="text-green-500 text-lg">Thank you for your feedback!</p>
            <p className="text-gray-700 mt-2">
              <strong>Your Rating:</strong> {userRating} ★
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Your Review:</strong> {review}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rating;
