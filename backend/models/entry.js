import mongoose from 'mongoose';

const Entry = new mongoose.Schema({
    owner: { type: String, required: true },
    date: { type: Date, default: Date.now },
    activity: { type: String, required: [true, 'Required for statistics'] },
    mood: { type: Number, min: 0, max: 10, required: [true, 'Required for statistics'] },
    remark: String
});

export default mongoose.model('Entry', Entry);