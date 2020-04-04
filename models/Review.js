const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxlength: 100,
        required: [true, 'Please add a title for review.']
    },
    text: {
        type: String,
        required: [true, 'Please add some text.']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1-10.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

// Prevent user from adding more than one review per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1}, { unique: true});

// Statics calculate 
// get out all ratings for a specific bootcamp
// calculate average and assign that to the bootcamp
ReviewSchema.statics.getAverageRating = async function(bootcampId) {
    console.log("Calculating average ratings");
    const obj = await this.aggregate([
        {
            $match: { bootcamp: bootcampId}
        },
        {
            $group: {
                _id: '$bootcamp',
                averageRating: { $avg: '$rating'}
            }
        }
    ]);
    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
            averageRating: obj[0].averageRating
        })
    } catch (err) {
        console.error(err);
    }
}

// Call getAverageRating after save
ReviewSchema.post('save', function() {
    this.constructor.getAverageRating(this.bootcamp)
})

// Call getAverageRating before remove
ReviewSchema.pre('remove', function() {
    this.constructor.getAverageRating(this.bootcamp)
})

module.exports = mongoose.model('Review', ReviewSchema)