// 

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFAQ = () => {
  const [faq, setFaq] = useState({ question: '', answer: '' });
  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaq(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://bharatfd-backend-u15i.onrender.com/api/faqs/create-faq', faq)
      .then(() => {
        alert('FAQ created successfully');
        history('/');
      })
      .catch(err => {
        console.error('Error creating FAQ:', err);
        alert('Failed to create FAQ');
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Create FAQ</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700">Question</label>
            <input
              type="text"
              name="question"
              value={faq.question}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-semibold text-gray-700">Answer</label>
            <textarea
              name="answer"
              value={faq.answer}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-center">
            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            >
              Create FAQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFAQ;
