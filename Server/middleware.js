const jwt = require('jsonwebtoken');
const jwtPass = process.env.JWT_SECRET;

module.exports.adminMiddleware = (req, res, next) => {
    try {
        const tokenArray = req.headers.authorization.split(" ");
        if (tokenArray.length !== 2 || tokenArray[0] !== 'Bearer') {
            return res.status(401).json({ error: 'Invalid token format' });
        }
        const jwtToken = tokenArray[1];
        const response = jwt.verify(jwtToken, jwtPass);
        if (response) {
            next();
        } else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' ,
    err});
    }
};
