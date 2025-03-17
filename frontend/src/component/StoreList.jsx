import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStores } from "../features/storeSlice";

const StoreList = () => {
  const dispatch = useDispatch();
  const { stores } = useSelector((state) => state.stores);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStores, setFilteredStores] = useState([]);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  useEffect(() => {
    setFilteredStores(
      stores.filter((store) =>
        Object.values(store).join(" ").toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, stores]);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Stores</h2>
      
      <input
        type="text"
        placeholder="Search stores..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 "
      />

      <div className="bg-white shadow-md sm:pl-10">
        <table className="w-full min-w-max border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <tr key={store.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 truncate max-w-xs">{store.name}</td>
                  <td className="p-2 truncate max-w-xs">{store.email}</td>
                  <td className="p-2 truncate max-w-xs">{store.address}</td>
                  <td className="p-2 truncate max-w-xs">{store.total_ratings}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No stores found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreList;
