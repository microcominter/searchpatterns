const mongoose = require('mongoose');

const useripSchema = new mongoose.Schema({
    device_hash: {
        type: String,
        required: true,
        unique: true
    },
    request_count: {
        type: Number,
        default: 1
    },
    last_request_at: {
        type: Date,
        default: Date.now
    },
    ip_address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        default: null
    },
    region: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    postal_code: {
        type: String,
        default: null
    }
});

// Add a method to find or create a user
// userSchema.statics.findOrCreate = async function(deviceHash, ipAddress, ipInfo) {
//     let user = await this.findOne({ device_hash: deviceHash });

//     if (!user) {
//         user = await this.create({
//             device_hash: deviceHash,
//             ip_address: ipAddress,
//             city: ipInfo?.city || null,
//             region: ipInfo?.region || null,
//             country: ipInfo?.country || null,
//             postal_code: ipInfo?.postal || null,
//         });
//     } else {
//         // Update the user if necessary
//         user.request_count += 1;
//         user.last_request_at = Date.now();
//         await user.save();
//     }

//     return user;
// };

const Userinfo = mongoose.model('Userinfo', useripSchema);

module.exports = Userinfo;
