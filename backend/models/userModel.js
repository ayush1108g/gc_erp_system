const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No user name"],
  },
  rollNumber: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "No user email"],
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "No user phone Number"],
    unique: true,
    minlength: [10, "Incorrect phone number"],
    maxlength: [10, "Incorrect phone number"],
  },
  // photo: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    select: false,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student",
  },
  branch: {
    type: String,
  },
  isAlumni: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  cgpa: {
    type: Number,
  },
  gradeTenMarks: {
    type: String,
  },
  gradeTwelveMarks: {
    type: String,
  },
  address: {
    line1: {
      type: String,
      required: [true, "Address must be there"],
    },
    pin: {
      type: Number,
      required: [true, "PIN must be there"],
    },
    city: {
      type: String,
      required: [true, "City Name must be there"],
    },
    state: {
      type: String,
      required: [true, "State Name must be there"],
    },
    country: {
      type: String,
      required: [true, "Country Name must be there"],
    },
  },
  coursesEnrolled: [
    {
      courseName: {
        type: String,
        required: true,
      },
      attendance: [
        {
          date: {
            type: Date,
            required: true,
          },
          attended: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
  passwordChangedAt: Date,
  resetPasswordToken: {
    type: "string",
  },
  passwordresetexpired: Date,
});

userSchema.pre("save", async function (next) {
  console.log("isModifiedpass", this.isModified("password"));
  console.log("isNew", this.isNew);
  console.log("password", this.password);
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || !this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.createpasswordresetpassword = function () {
  const resetToken = Math.floor(Math.random() * 100000) + 100000;

  this.resetPasswordToken = resetToken;
  console.log({ resetToken }, this.resetPasswordToken);

  this.passwordresetexpired = Date.now() + 600000;

  return resetToken;
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
