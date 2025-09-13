const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    questions: [
        {
            question: String,
            options: [String],
            answer: String,
        },
    ],
});

module.exports = mongoose.model("Quiz", QuizSchema);
