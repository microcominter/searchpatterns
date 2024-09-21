const crypto = require('crypto');
const User = require('../../models/users'); // Ensure the path is correct
// const nodemailer = require('nodemailer');
const cache = require('memory-cache');
const axios=require('axios');
const jwt = require('jsonwebtoken');
const env = require('../../config/enviroment');

module.exports.sendOtp = async function (req, res) {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ message: 'Email or phone is required' });
        }

        // Generate a 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

        // Find or create the user
        

        cache.put("otp",otp,120000);
        // let a=cache.get();
        // console.log(a,"aa");
        
        // Send the OTP via email/SMS
        // Example: sending OTP via email
        // const transporter = nodemailer.createTransport({
        //     service: 'Gmail',
        //     auth: {
        //         user: 'your-email@gmail.com',
        //         pass: 'your-email-password'
        //     }
        // });

        // const mailOptions = {
        //     from: 'your-email@gmail.com',
        //     to: email,
        //     subject: 'Your OTP Code',
        //     text: `Your OTP code is ${otp}`
        // };

        // await transporter.sendMail(mailOptions);
        console.log("hiiii");
        
        console.log(otp);
        // const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
        //     route: 'v3',
        //     sender_id: 'TXTIND',
        //     variables_values: `YOUR OTP: ${otp}, valid only for 2 minutes`,
        //     language: 'english',
        //     numbers: phone
        //     }, {
        //         headers: {
        //             "authorization": 'WrypnZsmizNCgQPxuwjA6oFBa7MhbtTGLSOU9El8cRfd1IHX0YO5whHLGtTWDoiuzUQXMbmfa98crYeK',
        //             'Content-Type': 'application/json'
        //         }
        //     });
            // console.log(response);
            
            if (otp){
                return res.json({ message: 'OTP sent successfully via SMS' });
            } else {
                return res.status(500).json({ message: response.data.message });
            }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Failed to send OTP via SMS', error: error.message });
    }
};

module.exports.verifyOtp = async function (req, res) {
    try {
        const { phone, otp } = req.body;
        let check = cache.get("otp");

        if (check !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (!check) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // OTP is valid; clear the OTP fields
        console.log(phone);
        
        
        let user = await User.findOne({ phone });
        if(user){
            console.log("user found");
            
        }
        if (!user) {
            user = await User.create({ phone, ip_address: req.ip });
        } else {
            console.log("hiii");
            
            user.updated_at = Date.now();
            await user.save();
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            env.jwt_secret, // Ensure you have a JWT_SECRET in your environment variables
            { expiresIn: '10days' } // Token expires in 1 hour
        );
        res.json({ message: 'OTP verified successfully', token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to verify OTP' });
    }
};

