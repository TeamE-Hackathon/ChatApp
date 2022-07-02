const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

// Get a list of all users
router.get('/', UserController.getAllUsers);

//Create a new user
router.post('/', UserController.createNewUser);

//Get a user by uid
router.get('/:uid', UserController.findUserById);

//Update a user by uid
router.patch('/:uid', UserController.updateAUser);

//Delete a user by uid
router.delete('/:uid', UserController.deleteAUser);

module.exports = router;
