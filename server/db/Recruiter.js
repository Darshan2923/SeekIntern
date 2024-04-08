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
        required: true,
        // validate: {
        //     validator: function (v) {
        //         // You can use a regular expression or any other method to validate phone numbers
        //         return /\d{3}-\d{3}-\d{4}/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid phone number!`
        // }
    },
    bio: {
        type: String,
    },
},
    { collation: { locale: "en" } });
const recruiterModel = mongoose.model("RecruiterInfo", RecruiterSchema);

export default recruiterModel;