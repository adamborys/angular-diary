import mongoose from 'mongoose';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';

const User = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: String,
    salt: String
});

User.method({
    setPassword: function(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    },
    validatePassword: function(password) {
        const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
        return this.passwordHash === hash;
    },
    generateToken: function() {
        return jsonwebtoken.sign({
            _id: this._id,
            email: this.email
        }, process.env.AUTH, {expiresIn: '1h'});
    }
});

export default mongoose.model('User', User);