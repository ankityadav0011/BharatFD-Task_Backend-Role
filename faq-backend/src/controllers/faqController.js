const FAQ = require('../models/Faq');
const translate = require('@vitalets/google-translate-api').default;;

const redis = require('../config/redis');


const getFAQs = async (req, res) => {
  const lang = req.query.lang || 'en';
  const cachedFAQs = await redis.get(`faqs_${lang}`);
  
  // if (cachedFAQs) {
  //   return res.json(JSON.parse(cachedFAQs));
  // }

  const faqs = await FAQ.find();
  const translatedFaqs = faqs.map(faq => ({
    _id: faq._id,
    question: faq.getTranslatedText(lang),  // Simplified
    answer: faq.answer,
    translations: faq.translations          // Include all translations if needed
  }));

  await redis.set(`faqs_${lang}`, JSON.stringify(translatedFaqs));
  res.json(translatedFaqs);
};



//Create FAQ
const createFAQ = async (req, res) => {
  const { question, answer } = req.body;

  // Translate to Hindi and Bengali
  
  const translations = {};
  try {
    const hiTranslation = await translate(question, { to: 'hi' });
    translations.hi = hiTranslation.text;
    const bnTranslation = await translate(question, { to: 'bn' });
    translations.bn = bnTranslation.text;
  } catch (err) {
    console.error('Translation error:', err);
  }

  const faq = new FAQ({ question, answer, translations });
  await faq.save();
  res.status(201).json(faq);
};

//Edit FAQ
const editFAQ = async (req, res) => {
  const { id } = req.params;  // Get the FAQ ID from the URL
  const { question, answer } = req.body;  // Get updated question and answer from the request body

  try {
    let faq = await FAQ.findById(id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    faq.question = question;
    faq.answer = answer;

    // Translate the question into Hindi and Bengali
    const translations = {};
    try {
      const hiTranslation = await translate(question, { to: 'hi' });
      translations.hi = hiTranslation.text;
      const bnTranslation = await translate(question, { to: 'bn' });
      translations.bn = bnTranslation.text;
    } catch (err) {
      console.error('Translation error:', err);
    }

    faq.translations = translations;

    await faq.save();

    // Clear the cache for the FAQ translations (since the question has changed)
    await redis.del(`faqs_${faq.language}`);

    res.json(faq);
  } catch (err) {
    console.error('Error editing FAQ:', err);
    res.status(500).json({ message: 'Error editing FAQ' });
  }
};

// Delete FAQ
const deleteFAQ = async (req, res) => {
  const { id } = req.params;

  try {
    const faq = await FAQ.findById(id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    await faq.deleteOne();// Delete the FAQ from the database
    await redis.del(`faqs_${faq.language}`); // Clear the cache

    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (err) {
    console.error('Error deleting FAQ:', err);
    res.status(500).json({ message: 'Error deleting FAQ' });
  }
};
module.exports = { getFAQs, createFAQ, editFAQ, deleteFAQ };
