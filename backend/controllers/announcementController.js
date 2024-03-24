const Announcement = require('../models/announcementModel');

// Get all announcements
exports.getAllAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json({ announcements });
  } catch (error) {
    next(error);
  }
};

// Create a new announcement
exports.createAnnouncement = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { message } = req.body;
    const date = new Date(Date.now());

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const suffixes = ['th', 'st', 'nd', 'rd'];

    // Determine the suffix for the day
    let suffix;
    if (day >= 11 && day <= 13) {
    suffix = suffixes[0];
    } else {
    suffix = suffixes[day % 10] || suffixes[0];
    }

    // Construct the formatted date string
    const time = `${day}${suffix} ${month} ${year}`;
    
    const newAnnouncement = await Announcement.create({ message, time, userId, date });
    res.status(201).json({ announcement: newAnnouncement });
  } catch (error) {
    next(error);
  }
};

// Update an announcement
exports.updateAnnouncement = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { announcementId } = req.params;
    const { message } = req.body;
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      announcementId,
      { message, userId },
      { new: true }
    );
    res.status(200).json({ announcement: updatedAnnouncement });
  } catch (error) {
    next(error);
  }
};

// Delete an announcement
exports.deleteAnnouncement = async (req, res, next) => {
  try {
    const { announcementId } = req.params;
    await Announcement.findByIdAndDelete(announcementId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
