const crypto = require('crypto');
const axios = require('axios');
const Userinfo = require('../models/user_ip'); // Assuming the User model is in 'Userinfo.js'

module.exports.user_details = async function (req, res) {
    try {
        // 1. Get the IP address
        const ipAddress = req.ip;

        // 2. Generate the device hash using IP address and User-Agent
        const userAgent = req.headers['user-agent'];
        const deviceHash = crypto.createHash('sha256').update(ipAddress + userAgent).digest('hex');

        // 3. Check if the user exists in the database
        let user = await Userinfo.findOne({ device_hash: deviceHash });

        if (!user) {
            // New user, fetch IP info and save
            const ipInfoResponse = await axios.get(`https://ipinfo.io/${ipAddress}/json?token=${process.env.IPINFO_TOKEN}`);
            const ipInfo = ipInfoResponse.data;

            // Save the new user information
            user = await Userinfo.create({
                device_hash: deviceHash,
                ip_address: ipAddress,
                city: ipInfo?.city || null,
                region: ipInfo?.region || null,
                country: ipInfo?.country || null,
                postal_code: ipInfo?.postal || null,
                request_count: 1,
                last_request_at: Date.now(),
            });

            res.json({
                message: 'New user information saved',
                deviceHash,
                ipAddress,
                ipInfo
            });
        } else {
            // Existing user, just update request count and last request time
           console.log("USer found");
           
            user.last_request_at = Date.now();
            await user.save();

            res.json({
                message: 'Existing user information updated',
                deviceHash,
                ipAddress,
                last_request_at: user.last_request_at
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
};
