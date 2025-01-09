import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../AuthProvider';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import UseAxios from './UseAxios';

const UpdateItem = () => {
  const { id } = useParams(); // Get the item ID from the route
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  let axiosInstance=UseAxios()

  const [postType, setPostType] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [dateLost, setDateLost] = useState(new Date());

  useEffect(() => {
    // Fetch the existing data for the item
    axiosInstance.get(`/items/${id}`) // Replace with your backend endpoint
      .then((res) => {
        const data = res.data;
        setPostType(data.postType);
        setThumbnail(data.thumbnail);
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setLocation(data.location);
        setDateLost(new Date(data.dateLost));
      })
      .catch((err) => console.error('Failed to fetch item data:', err));
  }, [id,axiosInstance]);

  const handleImageChange = (e) => {
    setThumbnail(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      postType,
      thumbnail,
      title,
      description,
      category,
      location,
      dateLost,
    };

    axiosInstance
      .put(`/updateItems/${id}`, updatedData) 
      .then(() => {
        toast.success('Item updated successfully!');
        navigate('/myItems'); 
      })
      .catch((err) => {
        console.error('Failed to update item:', err);
        toast.error('Failed to update item. Please try again later.');
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
    <h2 className="text-3xl font-bold mb-6 text-center">Update Item</h2>
    <form onSubmit={handleUpdate} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="postType" className="text-sm font-medium mb-2">
            Post Type
          </label>
          <select
            id="postType"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
          >
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>
  
        <div className="flex flex-col">
          <label htmlFor="thumbnail" className="text-sm font-medium mb-2">
            Thumbnail (Image URL)
          </label>
          <input
            type="text"
            id="thumbnail"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={thumbnail}
            onChange={handleImageChange}
            placeholder="Enter image URL"
          />
        </div>
      </div>
  
      <div className="flex flex-col">
        <label htmlFor="title" className="text-sm font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the item title"
        />
      </div>
  
      <div className="flex flex-col">
        <label htmlFor="description" className="text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide a description"
        ></textarea>
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="pets">Pets</option>
            <option value="documents">Documents</option>
            <option value="gadgets">Gadgets</option>
          </select>
        </div>
  
        <div className="flex flex-col">
          <label htmlFor="location" className="text-sm font-medium mb-2">
            Location where item was lost
          </label>
          <input
            type="text"
            id="location"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter the location"
          />
        </div>
      </div>
  
      <div className="flex flex-col">
        <label htmlFor="dateLost" className="text-sm font-medium mb-2">
          Date Lost
        </label>
        <DatePicker
          selected={dateLost}
          onChange={(date) => setDateLost(date)}
          dateFormat="MMMM d, yyyy"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
  
      <div className="space-y-2">
        <label htmlFor="contactInfo" className="text-sm font-medium mb-2">
          Contact Information
        </label>
        <div>
          <span className="text-sm">Name: {user?.displayName}</span>
        </div>
        <div>
          <span className="text-sm">Email: {user?.email}</span>
        </div>
      </div>
  
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Update Post
      </button>
    </form>
  </div>
  
  );
};

export default UpdateItem;
