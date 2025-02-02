const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const faqRoutes = require('./routes/faqRoutes');
require('dotenv').config();
const path = require("path")

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Root route to confirm the server is running
// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// deployment 
const __dirname1 = path.resolve();

// API  routes for FAQs
app.use('/api/faqs', faqRoutes);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname1,"/faq-frontend//fmy-project/dist")))


app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname1,"faq-frontend","fmy-project","dist","index.html"))
});
}
else{
  app.get('/', (req, res) => {
    res.send('Server is running');
  });
}



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
