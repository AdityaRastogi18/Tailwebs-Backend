const passport = require("passport");

const isAuthenticated = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized access denied",
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = isAuthenticated;
