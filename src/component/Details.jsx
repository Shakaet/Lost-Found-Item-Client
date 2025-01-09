import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import UseAxios from './UseAxios';
import LoadingSpinner from './LoadingSpinner';

const Details = () => {
  useEffect(() => {
                document.title = "Items Details"; 
              }, []);
  const { id } = useParams(); // Get the item ID from the URL
  const { user } = useContext(AuthContext); // Get logged-in user details
  const [item, setItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [recoveredLocation, setRecoveredLocation] = useState('');
  const [recoveredDate, setRecoveredDate] = useState(new Date());
  const [isRecovered, setIsRecovered] = useState(false);
  let axiosInstance=UseAxios()

  // Fetch item details based on ID
  useEffect(() => {
    axiosInstance
      .get(`/items/${id}`)
      .then((response) => {
        setItem(response.data);
        setIsRecovered(response.data.status === 'recovered');
      })
      .catch((error) => {
        console.error('Error fetching item', error);
        toast.error('Error fetching item details.');
      });
  }, [id,axiosInstance]);

  const handleRecover = () => {
    const recoveryData = {
      recoveredLocation,
      recoveredDate,
      recoveredBy: {
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
      },
      itemId: item._id,
      thumbnail:item?.thumbnail,
      title:item?.title,
      description:item?.description,
   

      

    };

    axiosInstance
      .post('/recovered-items', recoveryData)
      .then(() => {
        toast.success('Item recovery details saved successfully!');
        setIsRecovered(true); // Update status locally
        setModalOpen(false);
      })
      .catch(() => {
        toast.error('Error saving recovery details.');
      });
  };

  const handleButtonClick = () => {
    if (!isRecovered) {
      setModalOpen(true);
    } else {
      toast.info('This item has already been marked as recovered.');
    }
  };

  if (!item) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Item Details</h2>

      <div className="mb-6">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-40 h-40 object-cover rounded-md mb-10 mx-auto"
        />
        <h3 className="text-xl font-semibold">Title: {item.title}</h3>
        <p className="mt-2"><strong>Description:</strong> {item.description}</p>
        <p className="mt-2"><strong>Category:</strong> {item.category}</p>
        <p className="mt-2"><strong>Location:</strong> {item.location}</p>
        <p className="mt-2"><strong>Date Lost:</strong> {new Date(item.dateLost).toLocaleDateString()}</p>
        <div className="mt-4">
          <strong>Contact Information:</strong>
          <div>Name: {item.name}</div>
          <div>Email: {item.email}</div>
        </div>
      </div>

      {item.postType === 'Lost' &&  (
        <button
          onClick={handleButtonClick}
          className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Found This!
        </button>
      )}

      {item.postType === 'Found' &&   (
        <button
          onClick={handleButtonClick}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          This is Mine!
        </button>
      )}

      {/* Modal for recovering the item */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-4">Recover Item</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label htmlFor="recoveredLocation" className="block text-sm font-medium mb-2">
                  Location where item was recovered
                </label>
                <input
                  type="text"
                  id="recoveredLocation"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={recoveredLocation}
                  onChange={(e) => setRecoveredLocation(e.target.value)}
                  placeholder="Enter recovery location"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="recoveredDate" className="block text-sm font-medium mb-2">
                  Date Recovered
                </label>
                <DatePicker
                  selected={recoveredDate}
                  onChange={(date) => setRecoveredDate(date)}
                  dateFormat="MMMM d, yyyy"
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Recovered Person Info:</label>
                <div>Name: {user.displayName}</div>
                <div className='mt-5 mb-5'>Email: {user.email}</div>
                <div>
                  <img src={user.photoURL} alt="User" className="w-12 h-12 rounded-full" />
                </div>
              </div>

              <button
                type="submit"
                onClick={handleRecover}
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-full mt-3 py-3 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
