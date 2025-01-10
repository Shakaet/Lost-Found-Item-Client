import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthProvider';
import { toast } from 'react-toastify';
import UseAxios from './UseAxios';

const AllRecovered = () => {
  useEffect(() => {
                  document.title = "All Recovered Items"; 
                }, []);
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [isTableLayout, setIsTableLayout] = useState(true); // Control layout switch
  let axiosInstance=UseAxios()

  // Fetch all recovered items
  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`/recovered-items/${user?.email}`)
        .then((response) => {
          setItems(response.data);
        })
        .catch(() => {
          toast.error('Error fetching recovered items.');
        });
    }
  }, [user,axiosInstance]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Recovered Items</h2>

      {/* Layout Switch Button */}
      <div className="text-right mb-6">
        <button
          onClick={() => setIsTableLayout(!isTableLayout)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isTableLayout ? 'Switch to Card Layout' : 'Switch to Table Layout'}
        </button>
      </div>

      {/* Table Layout */}
      {isTableLayout ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No recovered items to display.</div>
          ) : (
            // <table className="min-w-full table-auto">
            //   <thead className="bg-blue-600 text-white">
            //     <tr>
            //       <th className="px-4 py-2">Title</th>
            //       <th className="px-4 py-2">Recovered Location</th>
            //       <th className="px-4 py-2">Recovered Date</th>
                 
            //     </tr>
            //   </thead>
            //   <tbody>
            //     {items.map((item) => (
            //       <tr key={item._id} className="border-b">
            //         <td className="px-4 py-2">{item.title}</td>
            //         <td className="px-4 py-2">{item.recoveredLocation}</td>
            //         <td className="px-4 py-2">{new Date(item.recoveredDate).toLocaleDateString()}</td>
                   
            //       </tr>
            //     ))}
            //   </tbody>
            // </table>
            <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Title</th>
                <th className="px-6 py-3 text-left font-semibold">Recovered Location</th>
                <th className="px-6 py-3 text-left font-semibold">Recovered Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-100 transition-colors">
                  <td className="px-6 py-4">{item.title}</td>
                  <td className="px-6 py-4">{item.recoveredLocation}</td>
                  <td className="px-6 py-4">{new Date(item.recoveredDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          

          )}
        </div>
      ) : (
        // Card Layout
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No recovered items to display.</div>
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm mb-2"><strong>Recovered Location:</strong> {item.recoveredLocation}</p>
                <p className="text-sm mb-2"><strong>Recovered Date:</strong> {new Date(item.recoveredDate).toLocaleDateString()}</p>
                <div className="flex justify-end mt-4">
                  
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllRecovered;
