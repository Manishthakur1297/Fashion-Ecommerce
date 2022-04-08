const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config()
// const config = require('config');
// const db = config.get('mongoURI');

const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true, 
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false});

        console.log("MongoDB Connected !!!!");
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }
}

module.exports = connectDB;