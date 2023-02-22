import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength: 5, maxlength: 25, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    profilePicture: { type: String, default: '' },
    coverPicture: { type: String, default: '' },
    desc: { type: String, maxlength: 50 },
    city: { type: String, maxlength: 15 },
    job: { type: String, maxlength: 20 },
    relationship: { type: Number, enum: [1, 2, 3] },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    online: { type: Boolean, default: false },
    IsAdmin: { type: Boolean, default: false },
}, { timestamps: true })


export default mongoose.model('User', UserSchema)