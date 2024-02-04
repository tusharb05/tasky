const jwt = require("jsonwebtoken");

require("dotenv").config();



const fetchUser = (req,res,next) => {

  const token = req.headers.token
  // console.log(token)c
  const decoded = jwt.verify(token, process.env.JWT_KEY, (err,decoded)=>{
      if (err) return false
      return decoded
    });
  if (!decoded) {
    return res.json({msg: "invalid token"})
  }
  req.body.id = decoded.id;
  next();
}

module.exports = fetchUser;