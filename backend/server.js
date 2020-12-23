const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/.env` });
//Import route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { connectDb } = require('./db');

//Connect to database
connectDb();

//Express Body Parser
app.use(express.json());
app.use(morgan('dev'));

app.use(cors());

//Mounting Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is Running in ${process.env.NODE_ENV} on port ${PORT}`)
);
