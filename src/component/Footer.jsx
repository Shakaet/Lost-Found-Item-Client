import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>

<footer className=" bg-gradient-to-r from-blue-500 to-teal-500 shadow-xl text-white py-10 px-6 font-bold">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
    {/* Column 1: About */}
    <div>
      <h3 className="text-xl font-bold mb-4">About Us</h3>
      <p className="text-sm leading-6">
        Lost & Found helps you connect with others to find your lost items or return found items quickly and effectively. Join us in making a difference!
      </p>
    </div>

    {/* Column 2: Quick Links */}
    <div>
      <h3 className="text-xl font-bold mb-4">Quick Links</h3>
      <ul className="space-y-3">
        <li>
          <Link to="/" className="hover:text-gray-200 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/alltimes" className="hover:text-gray-200 transition">
            Lost & Found Items
          </Link>
        </li>
        <li>
          <Link to="/additems" className="hover:text-gray-200 transition">
            Add Item
          </Link>
        </li>
        <li>
          <Link to="/allRecovered" className="hover:text-gray-200 transition">
            Recovered Items
          </Link>
        </li>
        <li>
          <Link to="/myItems" className="hover:text-gray-200 transition">
            Manage My Items
          </Link>
        </li>
      </ul>
    </div>

    {/* Column 3: Contact */}
    <div>
      <h3 className="text-xl font-bold mb-4">Contact Us</h3>
      <p className="text-sm mb-2">
        <strong>Email:</strong> abdshakaet@gmail.com
      </p>
      <p className="text-sm mb-2">
        <strong>Phone:</strong> +1 123-456-7890
      </p>
      <p className="text-sm">
        <strong>Address:</strong> 123 Main Street, Anytown, USA
      </p>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="border-t border-gray-400 mt-8 pt-4 text-center">
    <p className="text-sm">&copy; 2024 Lost & Found. All rights reserved.</p>
  </div>
</footer>


            
        </div>
    );
};

export default Footer;