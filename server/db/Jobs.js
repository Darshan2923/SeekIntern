import mongoose from "mongoose"

let schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        jobTitle: {
            type: String,
            required: true,
        },
        companyLogo: {
            type: String,
        },
        jobLocation: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        dateOfPosting: {
            type: Date,
            default: Date.now,
        },
        deadline: {
            type: Date,
            validate: [
                {
                    validator: function (value) {
                        return this.dateOfPosting < value;
                    },
                    msg: "deadline should be greater than dateOfPosting",
                },
            ],
        },
        skillsets: [String],
        jobType: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            min: 0,
            validate: [
                {
                    validator: Number.isInteger,
                    msg: "Duration should be an integer",
                },
            ],
        },
        salary: {
            type: Number,
            validate: [
                {
                    validator: Number.isInteger,
                    msg: "Salary should be an integer",
                },
                {
                    validator: function (value) {
                        return value >= 0;
                    },
                    msg: "Salary should be positive",
                },
            ],
        },
    }, { collation: { locale: "en" } });

const jobs = mongoose.model("jobs", schema);

export default jobs;
