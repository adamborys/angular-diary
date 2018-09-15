import mongoose from 'mongoose';

let Entry = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    activity: { type: String, required: [true, 'Required for statistics'] },
    mood: { type: Number, min: 0, max: 10, required: [true, 'Required for statistics'] },
    remark: String
});

export default mongoose.model('Entry', Entry);