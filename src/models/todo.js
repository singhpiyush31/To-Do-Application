const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3
    },
    description: {
        type: String
    },
    priority: {
        type: String,
        enum: {
            values: ["Low", "Medium", "High"],
            message: `{VALUE} is not a valid priority.`
        }
    },
    status: {
        type: String,
        enum: {
            values: ["Pending", "In-Progress", "Completed"],
            message: `{VALUE} is not a valid status.`
        }
    },
    dueDate: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: true } );

module.exports = mongoose.model("Todo", todoSchema);