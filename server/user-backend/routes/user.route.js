import User from '../models/user.js';
import logger from '../utilities/logger.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import express from 'express'

//Generate JWT
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    )
}

const userRouter = express.Router();

//Get all users
userRouter.route('/').get(async (req, res) => {
    try {
        const users = await User.find({ type: 'user' });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
        logger.error("Error getting all users");
    }
})

//Get user by email
userRouter.route("/get/:email").get(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            logger.error("User " + req.params.email + " not found");
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
        logger.error("Error getting user " + req.params.email);
    }
}),

    //Create a new user
    userRouter.route("/add").post(async (req, res) => {
        try {

            logger.info(req.body)
            const { firstName, lastName, userType, email, password } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({
                firstName,
                lastName,
                userType,
                email,
                password: hashedPassword
            });
            await user.save();
            res.status(201).json(user);
            logger.info("User create successful");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("User create failed");
        }
    }),

    //Update a user by email
    userRouter.route("/update/:email").put(async (req, res) => {
        try {
            const user = await User.findOneAndUpdate(
                { email: req.params.email },
                req.body,
                { new: true }
            );
            logger.info("User " + req.params.email + " update successful");
            if (!user) {
                logger.error("User " + req.params.email + " not found");
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("User " + req.params.email + " update unsuccessful");
        }
    }),

    //Delete a user by email
    userRouter.route("/delete/:email").delete(async (req, res) => {
        try {
            const user = await User.findOneAndDelete({ email: req.params.email });
            if (!user) {
                logger.error("User " + req.params.email + " not found");
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted' });
            logger.info("User " + req.params.email + " deleted successfully");
        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.info("User " + req.params.email + " deleted successfully");
        }
    }),

    //login
    userRouter.route("/login").post(async (req, res) => {
        const { email, password } = req.body
        const user = await User.findOne({ email: email });

        if (user && (await bcrypt.compare(password, user.password))) {

            const userLogin = {
                user,
                token: generateToken(user._id)
            }

            res.status(200).json(userLogin)
        } else {
            res.status(400).json('invalid credenials');
        }
    })

export default userRouter;