const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');


router.get('/', (req, res) => {
    res.render("user/edit", {
        Title: "Create User"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        create(req, res);
        else
        update(req, res);
});


function create(req, res) {
    const user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.age = req.body.age;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err) res.redirect('user/list');
           
            else console.log('Error:' + err);
    });
}


function update(req, res) {
   User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err)  res.redirect('user/list'); 
    
            else   console.log('Error ' + err);   
    });
}

router.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/user/list');
        }
        else { console.log('Error:' + err); }
    });
});


router.get('/list', (req, res) => {
    User.find((err, docs) => {
        if (!err) {
            res.render("user/list", {
                list: docs
            });
        }
        else {
            console.log('Error:' + err);
        }
    });
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("user/edit", {
                Title: "Edit User",
                user: doc
            });
        }
    });
});


module.exports = router;