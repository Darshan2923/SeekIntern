import mongoose from 'mongoose';

let schema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    jobid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: [
            "applied", // when a applicant is applied
            "shortlisted", // when a applicant is shortlisted
            "accepted", // when a applicant is accepted
            "rejected", // when a applicant is rejected
            "deleted", // when any job is deleted
            "cancelled", // an application is cancelled by its author or when other application is accepted
            "finished", // when job is over
        ],
        default: "applied",
        required: true,
    },
    dateOfApplication: {
        type: Date,
        default: Date.now,
    },
    dateOfJoining: {
        type: Date,
        validate: [
            {
                validator: function (value) {
                    return this.dateOfApplication <= value;
                },
                msg: "dateOfJoining should be greater than dateOfApplication",
            },
        ],
    },
    coverLetter: {
        type: String,
        validate: {
            validator: function (v) {
                return v.split(" ").filter((ele) => ele != "").length <= 250;
            },
            msg: "Statement of purpose should not be greater than 250 words",
        },
    },
},
    { collation: { locale: "en" } });

const appModel = mongoose.model("ApplicationInfo", schema);

export default appModel;