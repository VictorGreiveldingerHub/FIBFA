const auth = async (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).send({ error: "Vous devez être connecté !" });
  }
  next();
};

module.exports = auth;
