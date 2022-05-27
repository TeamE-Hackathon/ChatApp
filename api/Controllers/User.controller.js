const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require('../Models/User.model');

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const results = await User.find();
      // const results = await User.find({}, { __v: 0 });
      // const results = await User.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await User.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewUser: async (req, res, next) => {
    try {
      const user = new User(req.body);
      const result = await user.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }

    /*Or:
  If you want to use the Promise based approach*/
    /*
  const user = new User({
    name: req.body.name,
    price: req.body.price
  });
  user
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err.message);
    });
    */
  },

  findUserById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      // const user = await User.findOne({ _id: id });
      if (!user) {
        throw createError(404, 'User does not exist.');
      }
      res.send(user);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid User id'));
        return;
      }
      next(error);
    }
  },

  updateAUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await User.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'User does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid User Id'));
      }

      next(error);
    }
  },

  deleteAUser: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await User.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'User does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid User id'));
        return;
      }
      next(error);
    }
  },
};
