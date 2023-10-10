const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A User must have a name'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'A User must have a email'],
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email.'],
  },
  photo: {
    type: String,
    required: [true, 'A User must have a photo'],
  },
  password: {
    type: String,
    required: [true, 'A User must have a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A User must have a confirmPassword'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password did not matched',
    },
  },
});

userSchema.pre('save', async function (next) {
  // only run this function if password was actulluy modifyied
  if (!this.isModified('password')) return next();
  // hast the password with salt 10
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

userSchema.method.correctPassword = async (candidatePassword, userPassword) => {
  await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
