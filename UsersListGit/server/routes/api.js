/*jslint es6 */
"use strict";
const express = require("express");
const router = new express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");


const db = "mongodb://me:1@ds133192.mlab.com:33192/users";
mongoose.Promise = global.Promise;

mongoose.connect(db, function (err) {
    if (err) {
        console.error("Error!" + err);
    }
})
router.get("/users", function (req, res) {
    console.log("Get all users");
    User.find({})
        .exec(function (err, users) {
            if (err) {
                console.log("Error get users");
            } else {
                res.json(users);
            }
        });
});
router.get("/users/:id", function (req, res) {
    console.log("Get one user");
    User.findById(req.params.id)
        .exec(function (err, user) {
            if (err) {
                console.log("Error get users");
            } else {
                res.json(user);
            }
        });
});
router.post("/user", function (req, res) {
    console.log("Add user");
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.lastname = req.body.lastname;
    newUser.email = req.body.email;
    newUser.dateOfBirth = req.body.dateOfBirth;
    newUser.password = req.body.password;
    newUser.role = req.body.role;
    newUser.save(function (err, insertUser) {
        if (err) {
            console.log("Error save");
        } else {
            res.json(insertUser);
        }
    });
});

router.put("/user/:id", function (req, res) {
    console.log("Update");
    User.findByIdAndUpdate(req.params.id,
            {
        $set: {name: req.body.name, lastname: req.body.lastname, email: req.body.email, dateOfBirth: req.body.dateOfBirth, password: req.body.password, role: req.body.role}
        },
            {new: true},
            function (err, updateUser) {
        if (err) {
            res.send("error update");
        } else {
            res.json(updateUser);
        }
    });
});

router.delete("/user/:id", function (req, res) {
    console.log("Delete");
    User.findByIdAndRemove(req.params.id, function (err, deleteUser) {
        if (err) {
            res.send("Error delete");
        } else {
            res.json(deleteUser);
        }
    });
});
module.exports = router;
