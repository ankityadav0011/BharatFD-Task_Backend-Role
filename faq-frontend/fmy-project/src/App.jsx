import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FAQList from './components/FAQList';
import FAQForm from './components/createFAQ';
import FAQEdit from './components/FAQEdit';
import CreateFAQ from './components/createFAQ';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<FAQList/>} />
      <Route path="/create" element={<CreateFAQ/>} />
      <Route path="/edit/:id" element={<FAQEdit/>} />
    </Routes>
  </Router>
);

export default App;
