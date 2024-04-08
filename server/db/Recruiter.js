import mongoose from "mongoose";

const RecruiterSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        validate: {
            validator: function (v) {
                return v !== "" ? /\+\d{1,3}\d{10}/.test(v) : true;
            },
            msg: "Phone number is invalid!",
        },
    },
    bio: {
        type: String,
    },
},
    { collation: { locale: "en" } });
const recruiterModel = mongoose.model("RecruiterInfo", RecruiterSchema);

export default recruiterModel;