import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F3106%2F3106773.png&tbnid=l80-xUCxOQ3RtM&vet=12ahUKEwi9i-XK86mEAxX6NGIAHaSPAYAQMygiegUIARDIAQ..i&imgrefurl=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fprofile_3106773&docid=6ZJe1QwOl20tJM&w=512&h=512&q=profile%20picture%20free&ved=2ahUKEwi9i-XK86mEAxX6NGIAHaSPAYAQMygiegUIARDIAQ',
    },

},
{ timestamps: true }
);


const User = mongoose.model("User", userSchema);
export default User;