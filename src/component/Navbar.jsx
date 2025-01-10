import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider";

const Navbar = () => {
  const { user, signOuts } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 



  const handleLogout = () => {
    signOuts()
      .then(() => {
        toast.success("Successfully logged out!");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (


 <div className="navbar bg-gradient-to-r from-blue-500 to-teal-500 shadow-xl px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center w-full">
        <div className="flex-1">
          <Link to="/" className="flex gap-2 items-center">
            <span className="text-white text-2xl font-extrabold">Lost & Found</span>
          </Link>
        </div>
        <div className="flex-none ml-auto items-center md:hidden">
          {/* Show icon only when the menu is closed */}
          {!isMenuOpen && (
            <button className="text-white" onClick={toggleMenu}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="flex-none hidden md:flex items-center">
          <ul className="menu menu-horizontal px-1 items-center text-white font-extrabold text-base space-x-4 md:space-x-6">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition duration-300">Home</Link>
            </li>
            <li>
              <Link to="/alltimes" className="hover:text-yellow-400 transition duration-300">Lost & Found Items</Link>
            </li>

            {!user && (
              <li>
                <Link to="/login" className="hover:text-yellow-400 transition duration-300">Login</Link>
              </li>
            )}
          </ul>

          {user && (
            <div className="dropdown dropdown-end z-50">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div title={user?.displayName} className="w-12 h-12 rounded-full border-2 border-white">
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile Photo"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-box w-52"
              >
                <li>
                  <Link to="/additems" className="justify-between text-blue-500 hover:bg-blue-100 p-2 rounded-md font-bold">
                    Add Lost & Found Item
                  </Link>
                </li>
                <li>
                  <Link to="/allRecovered" className="text-blue-500 hover:bg-blue-100 p-2 rounded-md font-bold">
                    All Recovered Items
                  </Link>
                </li>
                <li>
                  <Link to="/myItems" className="text-blue-500 hover:bg-blue-100 p-2 rounded-md font-bold">
                    Manage My Items
                  </Link>
                </li>
                <li className="mt-2">
                  <button
                    onClick={handleLogout}
                    className="font-bold bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <ul className="text-white font-extrabold text-base space-y-4">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition duration-300" onClick={toggleMenu}>Home</Link>
            </li>
            <li>
              <Link to="/alltimes" className="hover:text-yellow-400 transition duration-300" onClick={toggleMenu}>Lost & Found Items</Link>
            </li>

            {!user && (
              <li>
                <Link to="/login" className="hover:text-yellow-400 transition duration-300" onClick={toggleMenu}>Login</Link>
              </li>
            )}

            {user && (
              <>
                <li>
                  <Link to="/additems" className=" hover:bg-blue-100  rounded-md font-bold" onClick={toggleMenu}>Add Lost & Found Item</Link>
                </li>
                <li>
                  <Link to="/allRecovered" className=" hover:bg-blue-100  rounded-md font-bold" onClick={toggleMenu}>All Recovered Items</Link>
                </li>
                <li>
                  <Link to="/myItems" className=" hover:bg-blue-100  rounded-md font-bold" onClick={toggleMenu}>Manage My Items</Link>
                </li>
                <li className="mt-2">
                  <button
                    onClick={handleLogout}
                    className="font-bold bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div> 



















  );
};

export default Navbar;





