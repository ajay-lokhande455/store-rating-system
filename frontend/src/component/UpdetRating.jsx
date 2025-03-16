import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const stores = [
  {
    id: 1,
    name: "Store One",
    owner: "Lyudmila Regetci",
    address: "123 Main St, Cityville",
    image:
      "https://imgs.search.brave.com/US2ZKToTB2iPCdJCSOWNRtmUgJ2wo5HXUey4iH6ydeY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMy/OTM4NDYxNS9waG90/by9zYWxlc3dvbWFu/LXNob3dpbmctYS1u/ZXctbW9iaWxlLXBo/b25lLXRvLWhlci1j/b2xsZWFndWUuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPWo4/blBZT2xPZW9QMmJM/NmtacE5MREF0dGxu/bFVPM3llazNRUDZE/bzUxMGc9",
    rating: 5,
  },
  {
    id: 2,
    name: "Store Two",
    owner: "John Doe",
    address: "456 Elm St, Townsville",
    image:
      "https://imgs.search.brave.com/US2ZKToTB2iPCdJCSOWNRtmUgJ2wo5HXUey4iH6ydeY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMy/OTM4NDYxNS9waG90/by9zYWxlc3dvbWFu/LXNob3dpbmctYS1u/ZXctbW9iaWxlLXBo/b25lLXRvLWhlci1j/b2xsZWFndWUuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPWo4/blBZT2xPZW9QMmJM/NmtacE5MREF0dGxu/bFVPM3llazNRUDZE/bzUxMGc9",
    rating: 4,
  },
  {
    id: 3,
    name: "Store Three",
    owner: "Jane Smith",
    address: "789 Pine St, Villageton",
    image:
      "https://imgs.search.brave.com/c-0xkBwqV6aGyVy3nHIEJ7jhhTQ3GTOV0tEVyHVjozM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjA4/MTY2NzcxL3Bob3Rv/L3dvbWFuLXNob3dp/bmctc2hvcC1vd25l/ci1waG90b3Mtb24t/c21hcnRwaG9uZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/TUNMeTZqclhrLUJ6/VHlTNXZJWXFiYUF4/d21mNDRmY08xUmRG/UkM2V0hvQT0",
    rating: 5,
  },
];

const UpdateRating = () => {
 
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
          <div key={store.id} className="bg-black w-full max-w-sm mx-auto  ">
            <img
              src={store.image}
              alt={store.name}
              className="w-full h-60 object-cover rounded-md"
            />
            <div className="p-4 mt-4">
              <h2 className="text-xl text-white font-bold">{store.name}</h2>
              <p className="text-gray-300">{store.owner}</p>
              <p className="text-gray-400">{store.address}</p>

              <div className="flex items-center mt-2">
                <span className="text-yellow-400 font-semibold mr-2">
                  Overall Rating:
                </span>
                {[...Array(store.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>

              <button
                className="mt-3 bg-red-500 text-white px-4 py-2  hover:bg-red-600 transition-all"
              >
                Modify Rating
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateRating;
