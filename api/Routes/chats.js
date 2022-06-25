const express = require('express');
const router = express.Router();
const ChatsController = require('../controllers/chats');

router.get('/:roomName', ChatsController.getChats);
router.post('/:roomName', ChatsController.postNewChat);

module.exports = router;
