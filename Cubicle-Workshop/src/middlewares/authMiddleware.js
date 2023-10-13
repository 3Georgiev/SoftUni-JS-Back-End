const jwt = require("../lib/jwt");

exports.auth = async (req, res, next) => {
  const token = req.cookies["auth"];

  if (token) {
    try {
      const decodedToken = await jwt.verify(token, "CoolSecret");
      req.user = decodedToken;
      res.locals.user = decodedToken;
      res.locals.isAuthenticated = true;

      next();
    } catch (error) {
      console.log(error);
      res.clearCookie("auth");
      res.redirect("users/login");
    }
  } else {
    next();
  }
};
