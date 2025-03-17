import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreRatings } from "../features/ratingSlice";
import { FaStar } from "react-icons/fa";

const RatingsList = () => {
    const { ratings } = useSelector((state) => state.ratings);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStoreRatings());
    }, [dispatch]);

    return (
        <div className="overflow-x-auto md:px-10">
            <h2 className="text-2xl font-bold m-4">Store Ratings</h2>
            <div className="bg-white shadow-md p-4">
                <table className="w-full min-w-max border-collapse">
                    <thead>
                        <tr className="border-b bg-gray-100">
                            <th className="p-2 text-left">User Name</th>
                            <th className="p-2 text-left">Rating</th>
                            <th className="p-2 text-left">Comment</th>
                            <th className="p-2 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ratings.length > 0 ? (
                            ratings.map((rating) => (
                                <tr key={rating.id} className="border-b hover:bg-gray-50">
                                    <td className="p-2 truncate max-w-xs">{rating.userName}</td>
                                    <td className="p-2 truncate max-w-xs">{rating.score}<FaStar/></td>
                                    <td className="p-2 truncate max-w-xs">{rating.comment || "No comment"}</td>
                                    <td className="p-2 truncate max-w-xs">{new Date(rating.date).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-2 text-center">No ratings yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RatingsList;
