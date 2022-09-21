var UserModel = require('../models/UserModel');

let controller = {
    all: function(req, res) {
        UserModel.find({}).lean().exec(function(err, users){
            if (err)
                return res.json([]);
            return res.json(users);
        })
    }
}

module.exports = controller;