const mongoose = require('mongoose');

const connectDB = async () => {
    try {                                   //takes in URI in .env
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        // .cyan and .underline come from the colors package
        console.log(`Mongoose Connected to ${conn.connection.host}`.cyan.underline);
    } catch (err) {
        console.log(err);
        //node process method to close the process with failure (1)
        process.exit(1);
    }
}

module.exports = connectDB;