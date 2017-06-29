/*jslint es6 */
"use strict";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,
    lastname: String,
    email: String,
    dateOfBirth: Date,
    password: String,
    role: String

});

module.exports = mongoose.model("user", userSchema, "user");
