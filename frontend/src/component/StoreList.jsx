import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStores } from "../features/storeSlice";
const StoreList = () => {
    const { stores, loading } = useSelector((state) => state.stores);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStores());
      }, [dispatch]);

    return(
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Stores</h2>
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
            {stores.map((store) => (
              <tr key={store.id} className="border-b hover:bg-gray-50">
                <td className="p-2 truncate max-w-xs">{store.name}</td>
                <td className="p-2 truncate max-w-xs">{store.email}</td>
                <td className="p-2 truncate max-w-xs">{store.address}</td>
                <td className="p-2 truncate max-w-xs">{store.total_ratings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
};

  export default StoreList;