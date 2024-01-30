const jwt = require("jsonwebtoken");

const JWT_KEY = "asdf";

const fetchUser = (req,res,next) => {

  const token = req.header('token');
  if(!token) {
    res.status(401).json({msg: "invalid token"});
  }
  const data = jwt.verify(token, JWT_KEY);
  req.user = data.user;
  next();
}

module.exports = fetchUser;