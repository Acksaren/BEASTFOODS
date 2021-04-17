const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName: 
    {
        type : String,
        required : true
    },
    lastName:
    {
        type : String,
        required : true
    },
    email: 
    {
        type: String,
        required: true,
        unique: true
    },
    password: 
    {
       type: String,
       required: true,

    }
});

UserSchema.pre("save", function(next) {
    var user = this;

    bcrypt.genSalt()
    .then((salt) => 
    {

        bcrypt.hash(user.password, salt)
        .then((encryptedPwd) => {
            user.password = encryptedPwd;
            next();
        })
        .catch((err) => {
            console.log(`Error occured when hashing. ${err}`);
        });
    })
    .catch((err) => {
        console.log(`Error occured when salting. ${err}`);
    });
});

UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
})

const userModel = mongoose.model("users", UserSchema);
module.exports = userModel;