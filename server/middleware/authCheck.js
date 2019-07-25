module.exports = {
  usersOnly: (req, res, next) => {
    if (!req.session.user.loggedIn) {
      return res.status(401).send("Not authorized");
    }
    next();
  },
  adminsOnly: (req, res, next) => {
    if (!req.session.user.is_admin) {
      return res.status(403).send("You are not an admin");
    }
    next();
  }
};
