const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

router.get('/', announcementController.getAllAnnouncements);

router.post('/', announcementController.createAnnouncement);

router.patch('/:announcementId', announcementController.updateAnnouncement);

router.delete('/:announcementId', announcementController.deleteAnnouncement);

module.exports = router;
