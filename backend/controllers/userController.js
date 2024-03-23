const express = require("express");
const User = require("./../models/userModel.js");
const factory = require("./handlerFactory");

const crypto = require("crypto");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const catchasync = require("../utils/catchAsync");
const email = require("./../utils/nodemailer");
const AppError = require("./../utils/appError");
const authentication = require("./authentication");

exports.verifytoken = catchasync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "token verified",
    name: req.user.name,
  });
});

exports.signup = catchasync(async (req, res, next) => {
  console.log(req.body);
  req.body.isApproved = false;
  if (!req.body.role) {
    return next(new AppError("please provide role", 400));
  }
  if (req?.body?.role === "student") {
    if (req.body.courses_taught) req.body.courses_taught = [];

    if (!req.body?.personal_info?.rollNumber) {
      return next(new AppError("please provide roll number", 400));
    }
  }
  const newusersignup = await User.create(req.body);

  authentication.createSendToken(newusersignup, 201, res);
});

exports.login = catchasync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect email or password", 401));
  }
  if (user.isApproved === false) {
    return next(new AppError("Your account is not approved yet", 401));
  }
  console.log(user);
  authentication.createSendToken(user, 200, res);
});

exports.forgotPassword = catchasync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError("there is no user with that email address", 404));

  const resetToken = await user.createpasswordresetpassword();
  console.log(resetToken);
  await user.save();
  const code = resetToken;
  console.log(code);
  const message = `Your verification code is \n ${resetToken}\n If you didn't forget your password, please ignore this email!`;
  try {
    await email({
      email: user.email,
      subject: "Password Reset code",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "password reset link sent to your email",
      resetToken,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err);
    return next(
      new AppError("there was an error sending the email. try again later", 500)
    );
  }
});

exports.verifycode = catchasync(async (req, res, next) => {
  const hashtoken = req.body.code;
  console.log(hashtoken);
  const user = await User.findOne({
    resetPasswordToken: hashtoken,
    passwordresetexpired: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError("password reset code is invalid", 404));
  }
  res.status(200).json({
    status: "success",
    message: "go to next page",
  });
});

exports.resetPassword = catchasync(async (req, res, next) => {
  const hashtoken = req.params.token;
  console.log(hashtoken);
  const user = await User.findOne({
    resetPasswordToken: hashtoken,
    passwordresetexpired: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError("password reset code is invalid", 404));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.passwordresetexpired = undefined;
  await user.save({ validateBeforeSave: true });
  authentication.createSendToken(user, 200, res);
});

exports.updateuser = catchasync(async (req, res) => {
  const user = req.user;
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
  user.address = req.body.address || user.address;

  await user.save();
  authentication.createSendToken(user, 200, res);
});

exports.updatepass = catchasync(async (req, res) => {
  const user = req.user;
  console.log(req.body.oldpassword, user.password);
  if (!(await user.correctPassword(req.body.oldpassword, user.password))) {
    return next(new AppError("incorrect password", 401));
  }
  user.password = req.body.newpassword;
  await user.save();
  authentication.createSendToken(user, 200, res);
});

exports.getuserbyid = catchasync(async (req, res) => {
  const user = req.user;
  const userData = {
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address,
  };
  res.status(200).json({
    status: "success",
    data: userData,
  });
});

exports.deleteUser = catchasync(async (req, res) => {
  const user = req.user;
  user.isActive = false;
  await user.save();
  authentication.createSendToken(user, 200, res);
});

exports.getallusers = async (req, res) => {
  try {
    const users = await usersignup.find();
    res.status(200).json({
      status: "success",
      length: users.length,
      data: users,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
