const express = require("express");
const User = require('./../models/userModel.js');
const factory = require('./handlerFactory');

exports.getUser = factory.getOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);
exports.getAllUsers = factory.getAll(User);