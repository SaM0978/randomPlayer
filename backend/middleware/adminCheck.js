const jwt = require("jsonwebtoken");
const JWT_ADMIN_SALT = process.env.JWT_ADMIN_SALT;

function userCheck(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Token Not Found" });
  }
  try {
    const data = jwt.verify(token, JWT_ADMIN_SALT);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Are You Really The Admin" });
  }
  next();
}

module.exports = userCheck;
