const express = require('express');
const router = express.Router();
const RoomsController = require('../controllers/rooms');

// 下記の書き方で/roomsが既に含まれている
router.get('/', RoomsController.getAllRooms);
router.post('/', RoomsController.postNewRoom);
router.get('/:roomName', RoomsController.findRoomById);

module.exports = router;
