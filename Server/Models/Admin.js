const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

AdminSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, parseInt(process.env.SALTS));
        this.password = hashedPassword;
        return next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model("Admin", AdminSchema);
