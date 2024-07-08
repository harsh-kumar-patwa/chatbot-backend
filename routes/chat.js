const express = require('express');
const router = express.Router();
const {chatHandler} = require('../controllers/chat');

router.post('/chat',chatHandler);
module.exports = router;
