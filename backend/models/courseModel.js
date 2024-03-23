const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A course must have a name!'],
        unique: true,
        trim: true,
        maxLength: [40, 'Course name length should be less!'],
    },
    ratingAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating should be from 1 to 5!'],
        max: [5, 'Rating should be from 1 to 5!'],
        set: val => Math.round(val*10) / 10
    },
    semester: {
        type: Number,
        required: [true, 'A course must have a semester number']
    },
    branch: {
        type: [String],
        required: [true, 'A course must have a branch!'],
        trim: true,
        maxLength: [40, 'Course name length should be less!'],
    },
    faculty: {
        type: [String],
        required: [true, 'A faculty must have a name!'],
        trim: true,
        maxLength: [40, 'name length should be less!'],
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    // guides: [
    //     {
    //         type: mongoose.Schema.ObjectId,
    //         ref: 'User'
    //     }
    // ]
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
}
);

const Course = mongoose.model('Course',courseSchema);

module.exports = Course;