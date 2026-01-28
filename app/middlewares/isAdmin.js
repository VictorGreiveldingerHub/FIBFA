const isAdmin = async (req, res, next) => {
  if (req.session.user.role !== "ADMIN") {
    return res.status(403).send({
      error: "Vous devez être administrateur pour faire cette action :/",
    });
  }
  next();
};

module.exports = isAdmin;
