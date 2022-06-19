const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler); // overrride express default error handler


app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})
