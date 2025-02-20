const userModel = require('../Model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "hensijivani06@gmail.com",
        pass: "yrbokhkysosvskfr",
    },
});

async function main(email) {
    const info = await transporter.sendMail({
        from: 'hensijivani06@gmail.com',
        to: email,
        subject: "Hello ✔",
        text: "SignUp Successfully",
        html: "<b>Welcome to Our Website!!!</b>",
    });

    console.log("Message sent: %s", info.messageId);
}

exports.createUser = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                status: 'Fail',
                Message: 'Email already exists'
            });
        }

        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = new userModel(req.body);
        await user.save();

        res.status(200).json({
            status: 'Success',
            Message: 'Signup Successfully',
            Data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            Message: error.message
        });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const loginData = await userModel.findOne({ email: req.body.email });
        if (!loginData) throw new Error('Invalid Username');

        const verifyPassword = await bcrypt.compare(req.body.password, loginData.password);
        if (!verifyPassword) throw new Error('Invalid Password');

        const token = jwt.sign({ id: loginData._id }, 'surat');
        await main(req.body.email);  // Send welcome email

        res.status(200).json({
            status: 'Success',
            Message: 'Login User Successfully',
            Data: loginData,
            token
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            Message: error.message
        });
    }
};


