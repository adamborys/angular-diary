import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

export default mongoose.model('User', User);