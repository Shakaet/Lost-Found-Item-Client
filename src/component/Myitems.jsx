import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import UseAxios from "./UseAxios";

const MyItems = () => {
   useEffect(() => {
              document.title = "Manage my items"; 
            }, []);
  const [items, setItems] = useState([]);
  let {user}=useContext(AuthContext)
  let axiosInstance=UseAxios()

  useEffect(() => {
    axiosInstance.get(`/myItems/${user?.email}`).then((res) => {
      setItems(res.data);
    });
  }, [axiosInstance, user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/myItems/${id}`).then(() => {
          setItems(items.filter((item) => item._id !== id));
          toast.success("Item deleted successfully!");
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-6">
          Manage My Items
        </h1>
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              You have not added any items yet.
            </p>
          </div>
        ) : (
            <div className="overflow-x-auto w-full">
            <table className="min-w-full border border-gray-200 rounded-lg text-sm sm:text-base">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="py-3 px-4 border border-gray-200 text-left whitespace-nowrap">
                    Title
                  </th>
                  <th className="py-3 px-4 border border-gray-200 text-left whitespace-nowrap">
                    Category
                  </th>
                  <th className="py-3 px-4 border border-gray-200 text-left whitespace-nowrap">
                    Location
                  </th>
                  <th className="py-3 px-4 border border-gray-200 text-center whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition duration-300"
                  >
                    <td className="py-3 px-4 border border-gray-200 break-words">
                      {item.title}
                    </td>
                    <td className="py-3 px-4 border border-gray-200 break-words">
                      {item.category}
                    </td>
                    <td className="py-3 px-4 border border-gray-200 break-words">
                      {item.location}
                    </td>
                    <td className="py-3 px-4 border border-gray-200 text-center">
                      <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                        <Link to={`/updateItems/${item._id}`}>
                          <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition w-full sm:w-auto">
                            Update
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition w-full sm:w-auto"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default MyItems;
