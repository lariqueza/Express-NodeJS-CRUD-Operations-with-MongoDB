const jwt = require('express-jwt');
const config = require('config.json');
require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../helpers/db');
const User = db.User;

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if(User && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    //validate
    if(await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    //hash password if it was entered
    if(userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    //save user 
    await user.save();
}

async function update(id, _userParam) {
    const user = await user.findById(id);

    //validate
    if(!user) throw 'User not found';
    if(user.username !== userParam.username && await UserfindOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    //hash password if it was entered
    if(userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    //copy userParam properties to user
    Object.assign(user, userParam);
    await user.save();
}

async function _delete(id) {
    await User.findIdAndAremove(id);
}

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete 
}