const mongoose = require('mongoose')

const UserRegistration = mongoose.model('UserRegistration', {
    name: String,
    password: String,
    email: String,
    profile: String,
    CRM: String,
    active: Boolean
})

module.exports = UserRegistration