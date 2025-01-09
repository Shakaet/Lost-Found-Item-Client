import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLoaderData } from 'react-router-dom'; // for navigation to the details page
import LoadingSpinner from './LoadingSpinner';

const AllItems = () => {
  useEffect(() => {
    document.title = 'Lost & Found items';
  }, []);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { count } = useLoaderData();

  // Pagination state
  const [itemPerPages, setItemPerPages] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);

  let handleItemPerPages=(e)=>{
 
    let val=parseInt(e.target.value)
   
    setItemPerPages(val)
    setCurrentPage(0)

}

  const numOfPages = Math.ceil(count / itemPerPages);
  const pages = [...Array(numOfPages).keys()];

 

  useEffect(() => {
    axios
      .get(`https://npm-server.vercel.app/allItems?page=${currentPage}&size=${itemPerPages}`)
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data); // Initialize filtered items with all items
      })
      .catch((error) => {
        console.error('There was an error fetching the items!', error);
      });
  }, [currentPage,itemPerPages]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
    setFilteredItems(filtered);
  };

  if (items.length === 0) {
    return <div className='font-bold text-5xl flex justify-center items-center'>There are no Data Found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Lost and Found Items</h2>

      {/* Search Input */}
      <div className="mb-6 md:w-1/2 mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search items by title..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-300 rounded-md shadow-lg p-4"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {item.description.substring(0, 100)}...
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Category: {item.category}
            </p>
            <p className="text-sm text-gray-600 mb-4">Location: {item.location}</p>
            <Link
              to={`/items/${item._id}`}
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col items-center">
        
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
              }
            }}
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Prev
          </button>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={() => {
              if (currentPage < pages.length - 1) {
                setCurrentPage(currentPage + 1);
              }
            }}
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Next
          </button>
        </div>

        {/* Items Per Page Selector */}
        <div className="mt-4">
          <select
            value={itemPerPages}
            onChange={handleItemPerPages}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>

      {/* No results message */}
      {filteredItems.length === 0 && (
        <p className="text-center text-gray-600 mt-4">
          No items found matching your search query.
        </p>
      )}
    </div>
  );
};

export default AllItems;
