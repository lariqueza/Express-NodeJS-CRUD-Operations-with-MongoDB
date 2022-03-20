const expressJwt = require('express-jwt');
require('dotenv').config();
const config = require('config.json');
const userService = require('../users/users.service');

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            '/users/authenticate',
            '/users/register',
            '/users/login'
        ]
    });
}
jwt();

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    //revoke token if user no longer exists
    if(!user) {
        return done(null, true);
    }

    done();
}