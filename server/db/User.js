import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

let UserSchema = new mongoose.Schema(
    {
        email: {
            type: mongoose.SchemaTypes.Email,
            unique: true,
            lowercase: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["recruiter", "applicant"],
            required: true,
        },
    },
    { collation: { locale: "en" } }
);

//   Password hashing
UserSchema.pre("save", function (next) {
    let user = this;

    if (!user.isModified("password")) {
        return next(); // If password is not modified, pass control to the next middleware or save the document
    }

    // If password is modified, hash it and then pass control to the next middleware or save the document
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err); // If an error occurs during hashing, pass the error to the next middleware
        }
        user.password = hash; // Set the hashed password
        next(); // Pass control to the next middleware or save the document
    });
});


// password verification upon login
UserSchema.methods.login = function (password) {
    let user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                reject(err);
            }
            if (result) {
                resolve();
            } else {
                reject();
            }
        })
    })
}

const userModel = mongoose.model("UserAuth", UserSchema);
export default userModel;
