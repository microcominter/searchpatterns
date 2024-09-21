const User = require('../../models/users');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const pkg = require('@clerk/clerk-sdk-node')
const clerkClient = pkg.clerkClient
module.exports.signin = async function (req, res) {
    try {
        console.log(req.auth);
        const { userId } = req.auth;
        console.log("id",userId);
        // Fetch user details from Clerk
        const clerkUser = await clerkClient.users.getUser(userId);
        console.log(clerkUser,"sdadsh",clerkUser.emailAddresses[0].emailAddress);
        // Find or create the user based on the Clerk u ser ID
        let user = await User.findOne({ clerk_id: userId });
        if (!user) {
            user = await User.create({
                clerk_id: userId,
                name: `${clerkUser.firstName} ${clerkUser.lastName}`,
                email: clerkUser.emailAddresses[0].emailAddress,
                phone: clerkUser.phoneNumbers[0]?.phoneNumber || null,
                ip_address: req.ip,
            });
        } else {
            user.updated_at = Date.now();
            await user.save();
        }

        res.json({ message: 'User authenticated successfully', user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to authenticate user' });
    }
};

// Protect routes that require authentication
module.exports.requireAuth = ClerkExpressRequireAuth({jwtKey:process.env.CLERK_JWT_KEY,authorizedParties:['http://localhost:5173']});