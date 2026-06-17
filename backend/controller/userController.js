import nodemailer from "nodemailer";
import userDataSchema from '../model/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    try {
        const findEmail = await userDataSchema.findOne({ email: req.body.email });
        if (findEmail !== null) {
            return res.json({
                success: false,
                status: 400,
                message: "Email already exists ",
                body: {}
            })
        } else {
            const saltRound = 10;
            const encPass = await bcrypt.hash(req.body.password, saltRound);
            const data = await userDataSchema.create({ ...req.body, password: encPass });
            console.log(data);
            return res.json({
                success: true,
                status: 200,
                message: "Account added successfully",
                body: { data }
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            status: 400,
            message: "User cannot be created",
            body: { data }
        })
    }
}

export const logIn = async (req, res) => {

    try {

        const { email, password } = req.body;

        // check email
        const findUser = await userDataSchema.findOne({ email });

        if (!findUser) {

            return res.json({
                success: false,
                status: 400,
                message: "Email does not exist",
                body: {}
            });

        }

        // compare password
        const checkPass = await bcrypt.compare(
            password,
            findUser.password
        );

        if (!checkPass) {

            return res.json({
                success: false,
                status: 400,
                message: "Incorrect password",
                body: {}
            });

        }
        const token = jwt.sign(
            {
                userId: findUser._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.json({
            success: true,
            status: 200,
            message: "Login successful",
            token,
            body: findUser
        });


    } catch (error) {

        return res.json({
            success: false,
            status: 500,
            message: error.message,
            body: {}
        });

    }

};

export const forgotPassword = async (req, res) => {

    try {

        // Step 1: get email
        const { email } = req.body;

        // Step 2: validate email
        if (!email) {

            return res.json({
                success: false,
                status: 400,
                message: "Please enter your email",
                body: {}
            });

        }

        // Step 3: check user exists
        const user = await userDataSchema.findOne({ email });

        if (!user) {

            return res.json({
                success: false,
                status: 400,
                message: "Email not registered",
                body: {}
            });

        }

        // Step 4: create reset token
        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const resetUrl = `http://localhost:5173/resetPassword/${resetToken}`;

        // Step 5: create transporter
        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }

        });

        // Step 6: email content
        const mailOptions = {

            from: `"HireSense Support" <${process.env.EMAIL_USER}>`,

            to: email,

            subject: "HireSense Password Reset",

            html: `
                <div style="
                    font-family: Arial;
                    padding: 20px;
                    background: #111;
                    color: white;
                    border-radius: 10px;
                ">

                    <h2>Reset Your HireSense Password</h2>

                    <p>
                        We received a request to reset your password.
                    </p>

                    <a href="${resetUrl}" 
                       style="
                        display:inline-block;
                        margin-top:15px;
                        padding:12px 22px;
                        background:#f0a500;
                        color:black;
                        text-decoration:none;
                        border-radius:6px;
                        font-weight:bold;
                       ">
                       Reset Password
                    </a>

                    <p style="margin-top:20px;">
                        If you did not request this, you can safely ignore this email.
                    </p>

                </div>
            `
        };

        console.log(process.env.EMAIL_USER);
        console.log(process.env.EMAIL_PASS);
        // Step 7: send email
        const info = await transporter.sendMail(mailOptions);

        console.log(info);

        console.log("Reset email sent successfully");

        // Step 8: response
        return res.json({

            success: true,

            status: 200,

            message: "Password reset link sent successfully",

            body: {}

        });

    } catch (error) {

        console.log(error.message);

        return res.json({

            success: false,

            status: 500,

            message: "Forgot password failed",

            body: {}

        });

    }

};

export const resetPassword = async (req, res) => {
    try {

        const { token } = req.params;

        const { password, confirmPassword } = req.body;

        let decoded;
        console.log("SECRET:", process.env.JWT_SECRET);
        try {
            decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message
            });

        }

        if (password !== confirmPassword) {

            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });

        }

        const encPass = await bcrypt.hash(
            password,
            10
        );

        await userDataSchema.findByIdAndUpdate(
            decoded.userId,
            {
                password: encPass
            }
        );

        return res.json({
            success: true,
            message: "Password reset successful"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const updatePractice = async (req, res) => {
    try {
        const { userId, seconds } = req.body;

        const user = await userDataSchema.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false
            });
        }

        user.practiceHours += seconds / 3600;

        const today = new Date().toDateString();

        if (
            !user.lastPracticeDate ||
            new Date(user.lastPracticeDate).toDateString() !== today
        ) {
            user.streak += 1;
            user.lastPracticeDate = new Date();
        }

        await user.save();

        return res.json({
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};