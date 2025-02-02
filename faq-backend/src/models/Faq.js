const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  hi: { type: String },
  bn: { type: String }
});

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: { type: translationSchema, default: {} }
});

faqSchema.methods.getTranslatedText = function (lang) {
  return this.translations[lang] || this.question;
};

module.exports = mongoose.model('FAQ', faqSchema);
