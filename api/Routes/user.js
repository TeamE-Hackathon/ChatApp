const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

// Get a list of all users
router.get('/', UserController.getAllUsers);

//Create a new user
router.post('/', UserController.createNewUser);

//Get a user by id
router.get('/:id', UserController.findUserById);

//Update a user by id
router.patch('/:id', UserController.updateAUser);

//Delete a user by id
router.delete('/:id', UserController.deleteAUser);

module.exports = router;
