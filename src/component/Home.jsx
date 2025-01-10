import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion
import axios from 'axios';
import banner1 from "../assets/banner1.webp"
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Home = () => {
  useEffect(() => {
    document.title = "Home - Lost & Found";
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  
  const banners = [banner1];

 

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
            className="w-full h-72 sm:h-80 md:h-96 rounded-lg object-cover"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {latestItems.slice(0,4).map((item) => (
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
        <div className="text-center mt-10">
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

     {/* Extra Section 1: Why Choose Us */}
     <motion.div
        className="bg-gradient-to-r from-green-600 via-blue-600 to-indigo-600 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
          <p className="text-lg mb-8">We offer the best platform for reconnecting people with their lost belongings.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white text-black rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-2">Fast and Reliable</h3>
              <p>Quickly find or report lost items with our efficient system.</p>
            </div>
            <div className="bg-white text-black rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-2">User-Friendly</h3>
              <p>Simple and intuitive design for all users.</p>
            </div>
            <div className="bg-white text-black rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-2">Secure</h3>
              <p>Your data is safe with us, ensuring privacy and trust.</p>
            </div>
          </div>
        </div>
      </motion.div>

  {/* Extra Section 3: Safety Tips for Lost & Found Items */}
<motion.div
  className="bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 py-12 mb-5"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.5 }}
>
  <div className="max-w-7xl mx-auto text-center px-6">
    <h2 className="text-3xl font-bold text-white mb-6">Safety Tips for Lost & Found Items</h2>
    <p className="text-lg mb-4">We prioritize your safety while helping you retrieve lost items. Follow these tips:</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div className="bg-white text-black rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-2">Tip 1</h3>
        <p>Meet in a safe, public place when returning or receiving an item.</p>
      </div>
      <div className="bg-white text-black rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-2">Tip 2</h3>
        <p>Do not share personal information like home addresses or financial details.</p>
      </div>
      <div className="bg-white text-black rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-2">Tip 3</h3>
        <p>Verify the item's details before meeting, and ask for proof of ownership.</p>
      </div>
    </div>
    <p className="text-lg mt-4">We encourage you to follow these simple precautions for a safer experience on our platform.</p>
  </div>
</motion.div>

    </div>
  );
};

export default Home;
