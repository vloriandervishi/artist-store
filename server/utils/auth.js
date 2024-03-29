const jwt = require("jsonwebtoken");
// set token secret and expiration date
const secret = "supersecretToken";
const expiration = "2h";
module.exports = {
  // function for our authenticated routes
  // authMiddleware: function (req, res, next) {
  authMiddleware: function ({ req }) {
    //  console.log(req.headers,"headers");
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    //["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
      console.log(token, " token");
    }
    if (!token) {
      // return res.status(400).json({ message: 'You have no token!' });
      console.log("token not found");
      return req;
    }
    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      console.log(req.user, "req.user");
    } catch {
      console.log("Invalid token", "auth");
      // return res.status(400).json({ message: 'invalid token!' });
    }
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
