const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: 
    {
        type: String,
        required: [true, 'No user name']
    },
    rollNumber:
    {
        type: String
    },
    email: 
    {
        type: String,
        required: [true, 'No user email'],
        unique: true,
        lowercase: true,
    },
    phoneNumber: 
    {
        type: String,
        required: [true, 'No user phone Number'],
        unique: true,
        minlength: [10, 'Incorrect phone number'],
        maxlength: [10, 'Incorrect phone number']
    },
    // photo: String,
    password: 
    {
        type: String,
        required: [true, 'invalid pwd'],
        minlength: 8,
        select: false
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        default: 'user'
    },
    branch: {
        type: String,
        required: [true, 'No branch name specified']
    },
    isAlumni: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    cgpa: {
        type: Number
    },
    gradeTenMarks: {
        type: Number
    },
    gradeTwelveMarks: {
        type: Number
    },
    address: {
        line1:{
            type: String,
            required: [true, 'Address must be there']
        },
        pin:{
            type: Number,
            required: [true, 'PIN must be there']
        },
        city:{
            type: String,
            required: [true, 'City Name must be there']
        },
        state: {
            type: String,
            required: [true, 'State Name must be there']
        },
        country: {
            type: String,
            required: [true, 'Country Name must be there']
        }
    },
    coursesEnrolled: [{
        courseName: {
            type: String,
            required: true
        },
        attendance: [{
            date: {
                type: Date,
                required: true
            },
            attended: {
                type: Boolean,
                default: false
            }
        }]
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;