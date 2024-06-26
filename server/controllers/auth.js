import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import userModel from '../db/User.js';
import recruiterModel from '../db/Recruiter.js';
import applicantModel from '../db/JobApplicant.js';

export const signup = async (req, res) => {
    try {
        const data = req.body;
        let user = new userModel({
            email: data.email,
            password: data.password,
            type: data.type,
        });

        await user.save(); // Wait for user to be saved

        const userdetails = user.type === "recruiter" ?
            new recruiterModel({
                userId: user._id,
                name: data.name,
                contactNumber: data.contactNumber,
                bio: data.bio,
            }) :
            new applicantModel({
                userId: user._id,
                name: data.name,
                education: data.education,
                skills: data.skills,
                rating: data.rating,
                resume: data.resume,
                profile: data.profile,
            });

        await userdetails.save(); // Wait for userdetails to be saved

        // Token
        const token = jwt.sign({ _id: user._id }, "jwt_secret");
        res.json({
            token: token,
            type: user.type,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const login = (req, res, next) => {
    passport.authenticate(
        "local",
        { session: false },
        function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.status(401).json(info);
                return;
            }
            // Token
            const token = jwt.sign({ _id: user._id }, "jwt_secret");
            res.json({
                token: token,
                type: user.type,
            });
        }
    )(req, res, next);
}