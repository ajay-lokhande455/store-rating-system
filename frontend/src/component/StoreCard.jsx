import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchStores } from "../features/storeSlice";
import { Link } from "react-router-dom";

const StoreCard = () => {
  const dispatch = useDispatch();
  const { stores, status, error } = useSelector((state) => state.stores);
  

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  if (status === "loading") return <p>Loading stores...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full px-6 md:px-12 lg:px-24 py-14">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
        Give The Rating to Store
      </h1>
      <p className="text-lg md:text-xl text-gray-500 mt-2">
        Find a store and submit your rating
      </p>

      <div className="w-full border-t border-gray-300 my-10"></div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
        {stores.map((store) => (
          <Link to={`/rating/${store.id}`}>
          <div key={store.id
          } className="bg-black w-full max-w-sm mx-auto  ">
            <img
              src={store.image}
              alt={store.name}
              className="w-full h-60 object-cover rounded-md"
            />
            <div className="p-4 mt-4">
              <h2 className="text-xl text-white font-bold">{store.name}</h2>
              <p className="text-gray-300">{store.owner}</p>
              <p className="text-gray-400">{store.address}</p>

              <div className="flex items-center mt-2 text-white">
                <span className="text-yellow-400 font-semibold mr-2">
                  Overall Rating:
                </span>
                <p className="text-white">{store.total_ratings
                }+</p>
              </div>

              <button className="mt-3 bg-red-500 text-white px-4 py-2  hover:bg-red-600 transition-all">
                Give Rating
              </button>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StoreCard;
