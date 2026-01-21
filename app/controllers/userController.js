const { User } = require("../models");

const userController = {
  getAll: async (req, res, next) => {
    try {
      const users = await User.findAll();

      res.send(users);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
  delete: async (req, res, next) => {
    try {
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
};

module.exports = userController;
