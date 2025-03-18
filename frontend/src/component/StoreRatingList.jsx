import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRatingsByStore } from "../features/ratingSlice";
import { fetchStores } from "../features/storeSlice";

const StoreRatingsList = () => {
  const dispatch = useDispatch();
  const { ratings } = useSelector((state) => state.rating);
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRatings, setFilteredRatings] = useState([]);

  const id = "27f3e797-8260-49fc-b86d-484d20c76fd4";
  useEffect(() => {
    dispatch(getRatingsByStore(id));
  }, [dispatch, id]);

  console.log(ratings);
  
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
      {/* <h1 className="p-2 truncate max-w-xs">{rating.Store?.name}</h1> */}

      <input
        type="text"
        placeholder="Search by User, Store, or Description..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />

      <div className="bg-white shadow-md p-4">
        <table className="w-full min-w-max border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2 text-left">User Name</th>
              <th className="p-2 text-left">User Email</th>
              <th className="p-2 text-left">Avarage Rating</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredRatings.length > 0 ? (
              filteredRatings.map((rating) => (
                <tr key={rating.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 truncate max-w-xs">{rating.User?.name}</td>
                  <td className="p-2 truncate max-w-xs">{rating.User?.email}</td>
                  <td className="p-2 truncate max-w-xs">{rating.rating}</td>
                  <td className="p-2 truncate max-w-xs">{rating.description}</td>
                  <td className="p-2 truncate max-w-xs">{new Date(rating.createdAt).toLocaleDateString()}</td>
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
