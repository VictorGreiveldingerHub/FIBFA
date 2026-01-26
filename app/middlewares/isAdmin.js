const isAdmin = (req, res, next) => {
  if (req.user.status !== "ADMIN") {
    return res.status(403).send("Accès réservé aux administrateurs");
  }
  next();
};

module.exports = isAdmin;
