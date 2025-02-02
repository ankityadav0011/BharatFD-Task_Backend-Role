


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FAQList = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    axios.get('https://bharatfd-backend-u15i.onrender.com/api/faqs/get-faq')
      .then(res => setFaqs(res.data))
      .catch(err => console.error('Error fetching FAQs:', err));
  }, []);

  const deleteFAQ = (id) => {
    if (!id || typeof id !== 'string') {
      console.error('Error: FAQ ID is invalid or undefined!', id);
      return;
    }
  
    console.log("Deleting FAQ with ID:", id);
    axios.delete(`https://bharatfd-backend-u15i.onrender.com/api/faqs/delete-faq/${id}`)
      .then(() => {  
        alert('FAQ deleted successfully');
        fetchFAQs();  // Re-fetch FAQs after deletion
      })
      .catch(err => console.error('Error deleting FAQ:', err));
  };
  
  // Function to fetch FAQs
  const fetchFAQs = () => {
    axios.get('https://bharatfd-backend-u15i.onrender.com/api/faqs/get-faq')
      .then(res => setFaqs(res.data))
      .catch(err => console.error('Error fetching FAQs:', err));
  };
  
  // Call fetchFAQs on component mount
  useEffect(() => {
    fetchFAQs();
  }, []);


  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">FAQs</h1>
        
        {faqs.length > 0 ? (
          faqs.map(faq => (
            <div key={faq._id} className="border-b border-gray-300 pb-4 mb-4 last:border-none">
              <h2 className="text-2xl font-semibold text-gray-800 hover:text-indigo-600 cursor-pointer transition duration-300">{faq.question}</h2>
              <p className="text-gray-700 mt-2">{faq.answer}</p>
              {/* <p className="text-sm text-gray-500 mt-2">ID: {faq._id}</p> */}

              <div className="flex space-x-4 mt-4">
                <Link to={`/edit/${faq._id}`} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300">Edit</Link>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFAQ(faq._id);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 mt-6">No FAQs available.</p>
        )}

        <div className="mt-6 text-center">
          <Link to="/create" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
            Create FAQ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQList;

