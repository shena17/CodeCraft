const express = require('express');
const router = express.Router();
const myListController = require('../controllers/myListController');
const { protect } = require('../middleware/authorization');

// Create a new mylist
router.post('/create', protect, myListController.createMylist);

// Get all mylists belonging to the logged-in user
router.get('/all', protect, myListController.getUserTutorials);

// Delete a mylist
router.delete('/delete/:id', protect, myListController.deleteMylist);

module.exports = router;