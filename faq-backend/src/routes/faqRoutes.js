const express = require('express');
const router = express.Router();
const { getFAQs, createFAQ, editFAQ, deleteFAQ } = require('../controllers/faqController');

// Get FAQs
router.get('/get-faq', getFAQs);

// Create FAQ
router.post('/create-faq', createFAQ);

// Edit FAQ
router.put('/edit-faq/:id', editFAQ);  // Endpoint for editing a FAQ

// Delete FAQ
router.delete('/delete-faq/:id', deleteFAQ);  // Endpoint for deleting a FAQ

module.exports = router;
