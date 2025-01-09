import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion
import axios from 'axios';
import banner1 from "../assets/banner1.webp"
import banner2 from "../assets/banner4.jpg"
import banner3 from "../assets/banner3.jpg"
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Home = () => {
  useEffect(() => {
    document.title = "Home - Lost & Found";
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  
  const banners = [banner1, banner2, banner3];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [banners.length]);

  const [latestItems, setLatestItems] = useState([]);

  useEffect(() => {
    
    axios
      .get('https://npm-server.vercel.app/items?limit=6&sort=desc')
      .then((response) => {
        setLatestItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching latest items:', error);
      });
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white min-h-screen">
     {/* Banner/Slider */}
     <motion.div
      className="carousel mx-auto my-8 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`carousel-item relative w-full ${
            currentSlide === index ? 'block' : 'hidden'
          }`}
        >
          <img
            src={banner}
            className="w-full h-72 sm:h-80 md:h-96 object-cover rounded-lg"
            alt={`Banner ${index + 1}`}
          />
        </div>
      ))}
    </motion.div>


      {/* Latest Find & Lost Items Section */}
      <motion.div
        className="max-w-7xl mx-auto px-6 py-12"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center mb-20">Latest Lost Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {latestItems.map((item) => (
            <motion.div
              key={item._id}
              className="bg-white text-black rounded-lg shadow-lg p-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mt-3 mb-3">{item.title}</h3>
              <p className="text-sm text-gray-600 font-bold mt-3 mb-3">Description: {item.description.substring(0, 100)}...</p>
              <p className="text-sm text-gray-600 font-bold mt-3 mb-3">Post-type: {item.postType}</p>
              <p className="text-sm text-gray-600  font-bold mt-3 mb-3">Category: {item.category}</p>
              <p className="text-sm text-gray-600 font-bold mt-3 mb-3">Location: {item.location}</p>
              <Link
                to={`/items/${item._id}`}
                className="inline-block mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/alltimes"
            className="inline-block bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          >
            See All
          </Link>
        </div>
      </motion.div>

      {/* Extra Section 1: How It Works */}
      <motion.div
        className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <p className="text-lg mb-4">Lost something? Found something? We make it simple for you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white text-black rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-2">Step 1</h3>
              <p>Post your lost or found item.</p>
            </div>
            <div className="bg-white text-black rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-2">Step 2</h3>
              <p>Browse items to find a match.</p>
            </div>
            <div className="bg-white text-black rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-2">Step 3</h3>
              <p>Connect with the owner/finder.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Extra Section 2: User Testimonials */}
      <motion.div
        className="bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-white mb-6">What Our Users Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white text-black rounded-lg shadow-lg p-6">
              <p className="italic">"This platform helped me find my lost wallet in just 2 days!"</p>
              <p className="text-right font-bold mt-4">- Jane Doe</p>
            </div>
            <div className="bg-white text-black rounded-lg shadow-lg p-6">
              <p className="italic">"Returning a lost phone was never this easy. Amazing service!"</p>
              <p className="text-right font-bold mt-4">- John Smith</p>
            </div>
            <div className="bg-white text-black rounded-lg shadow-lg p-6">
              <p className="italic">"Highly recommend this platform to everyone. Great work!"</p>
              <p className="text-right font-bold mt-4">- Emily Johnson</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-16 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Our Support</h2>
        <p className="text-lg mb-10">
          We're here to help you every step of the way. Contact us for any assistance, queries, or feedback.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Support Card 1 */}
          <div className="flex flex-col items-center bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <FaPhoneAlt className="text-4xl text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-sm">+1 123-456-7890</p>
          </div>
          {/* Support Card 2 */}
          <div className="flex flex-col items-center bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <FaEnvelope className="text-4xl text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-sm">support@example.com</p>
          </div>
          {/* Support Card 3 */}
          <div className="flex flex-col items-center bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <FaMapMarkerAlt className="text-4xl text-pink-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-sm">123 Main Street, Anytown, USA</p>
          </div>
          {/* Support Card 4 */}
          <div className="flex flex-col items-center bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <FaClock className="text-4xl text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Working Hours</h3>
            <p className="text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default Home;
