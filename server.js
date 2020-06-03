const express = require('express')
const connectDB = require('./config/db')
const morgan = require('morgan');
const cors = require('cors')
const path = require('path');
// require("dotenv").config()

const productRoutes = require('./routes/product')

const app = express();

//CORS
app.use(cors())

//Connect Database
connectDB();

//INIT Middleware
app.use(morgan('dev'));
app.use(express.json({ extended: false }))

// Define Product Routes
app.use('/api', productRoutes );

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));