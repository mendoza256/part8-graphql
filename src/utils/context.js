const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { JWT_SECRET } = require("./config");

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null;
  if (auth && auth.startsWith("Bearer ")) {
    const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
    const currentUser = await User.findById(decodedToken.id);
    return { currentUser };
  }
  return {};
};

module.exports = context;
