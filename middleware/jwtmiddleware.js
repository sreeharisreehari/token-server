const jwt = require('jsonwebtoken');

// Middleware to handle both access and refresh tokens
const jwtMiddleware = (req, res, next) => {

    // Extract access token from the Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json('Authorization header missing. Please login.');
    }
    
    const accessToken = authHeader.split(' ')[1]; // Bearer token
    console.log('Access Token:', accessToken);

    try {
        // Verify the access token
        const jwtResponse = jwt.verify(accessToken, 'secretkey123');
        console.log('JWT Response:', jwtResponse);

        // Attach user information (e.g., userID) to request
        req.payload = jwtResponse.userid;

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        // If access token verification fails, handle the refresh token
        console.log('Access token expired or invalid. Checking refresh token...');

        const refreshToken = req.headers['x-refresh-token']; // Expecting refresh token in custom header
        if (!refreshToken) {
            return res.status(401).json('No refresh token provided. Please login.');
        }

        try {
            // Verify the refresh token
            const refreshResponse = jwt.verify(refreshToken, 'refreshkey123');
            console.log('Refresh Token Response:', refreshResponse);

            // Optionally, create a new access token if the refresh token is valid
            const newAccessToken = jwt.sign({ userid: refreshResponse.userid }, 'secretkey123', { expiresIn: '15m' });
            res.setHeader('x-access-token', newAccessToken); // Send the new access token in response headers

            req.payload = refreshResponse.userid; // Attach user info to request
            next(); // Proceed to the next middleware or route handler
        } catch (refreshError) {
            // If refresh token is also invalid or expired
            return res.status(401).json('Invalid refresh token. Please login again.');
        }
    }
};

module.exports = jwtMiddleware;
