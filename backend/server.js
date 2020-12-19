const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

//Import route files
const authRoutes = require('./routes/authRoutes');

//Express Body Parser
app.use(express.json());
app.use(morgan('dev'));

//Mounting Routes
app.use('/api/v1/auth', authRoutes);

app.listen(5000, console.log('Server is Running on port 5000'));
