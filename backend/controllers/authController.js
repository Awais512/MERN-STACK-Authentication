exports.signup = async (req, res) => {
  try {
    res.json({ message: 'User Signed Up' });
  } catch (err) {
    console.log(err);
  }
};
