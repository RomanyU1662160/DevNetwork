const jwt = require("jsonwebtoken");
const config = require("config");

const authMiddlware = (req, res, next) => {
  // get token form the header
  //const token = req.headers["x-auth-token"];
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No Token, Auth Denied" });
  }

  //verify the token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log("Decoded  id :::" + JSON.stringify(decoded.id));
    //set the user
    req.id = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid." });
  }
};
module.exports = authMiddlware;
