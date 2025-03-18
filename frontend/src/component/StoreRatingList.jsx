import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRatingsByStore } from "../features/ratingSlice";

const StoreRatingsList = () => {
  const dispatch = useDispatch();
  const { ratings } = useSelector((state) => state.rating);
  const { storeId } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRatings, setFilteredRatings] = useState([]);
  
  const id = storeId;
  useEffect(() => {
    dispatch(getRatingsByStore(id));
  }, [dispatch, id]);

  
  useEffect(() => {
    setFilteredRatings(
      ratings.filter((rating) =>
        `${rating.User?.name} ${rating.Store?.name} ${rating.description}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, ratings]);

  return (
    <div className="overflow-x-auto h-screen md:px-10">
      <h2 className="text-2xl font-bold m-4">Your Store User Ratings</h2>

      <input
        type="text"
        placeholder="Search by User, Store, or Description..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 m-4 border border-gray-300 rounded-md"
      />

      <div className="bg-white shadow-md p-4 overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2 text-left">User Name</th>
              <th className="p-2 text-left">User Email</th>
              <th className="p-2 text-left">Average Rating</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredRatings.length > 0 ? (
              filteredRatings.map((rating) => (
                <tr key={rating.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 truncate max-w-[150px]">{rating.User?.name}</td>
                  <td className="p-2 truncate max-w-[200px]">{rating.User?.email}</td>
                  <td className="p-2 truncate max-w-[100px]">{rating.rating}</td>
                  <td className="p-2 truncate max-w-[300px]">{rating.description}</td>
                  <td className="p-2 truncate max-w-[120px]">{new Date(rating.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No ratings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreRatingsList;
