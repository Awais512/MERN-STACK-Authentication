const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/.env` });

exports.connectDb = async (req, res) => {
  const url = process.env.MONGO_URI;
  try {
    await mongoose.connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('MongDb Connected');
  } catch (err) {
    console.log(err);
  }
};
