import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditFAQ = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [faq, setFaq] = useState({ question: '', answer: '' });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/faqs/edit-faq/${id}`)
      .then(res => setFaq(res.data))
      .catch(err => console.error('Error fetching FAQ:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaq(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/faqs/edit-faq/${id}`, faq)
      .then(() => {
        alert('FAQ updated successfully');
        history('/');
      })
      .catch(err => {
        console.error('Error updating FAQ:', err);
        alert('Failed to update FAQ');
      });
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Edit FAQ</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="question" className="block text-lg font-medium text-gray-700">Question</label>
          <input
            type="text"
            name="question"
            id="question"
            value={faq.question}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the question"
          />
        </div>

        <div>
          <label htmlFor="answer" className="block text-lg font-medium text-gray-700">Answer</label>
          <textarea
            name="answer"
            id="answer"
            value={faq.answer}
            onChange={handleChange}
            required
            rows="5"
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the answer"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Update FAQ
          </button>
          <button
            type="button"
            onClick={() => history('/faqs')}
            className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFAQ;
