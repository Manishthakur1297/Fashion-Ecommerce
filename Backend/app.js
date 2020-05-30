const express = require('express')
const connectDB = require('./config/db')
const morgan = require('morgan');
const cors = require('cors')
require("dotenv").config()

const productRoutes = require('./routes/product')

const app = express();

//CORS
app.use(cors())

//Connect Database
connectDB();

//INIT Middleware
app.use(morgan('dev'));
app.use(express.json({ extended: false }))

// Define Routes
app.use('/api', productRoutes );


const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));
