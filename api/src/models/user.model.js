const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const RequestSchema = require('./request.model');
const InvitationSchema = require('./invitation.model');

const UserSchema = new mongoose.Schema({

    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, match: /.+\@.+\..+/, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    avatarUrl: { type: String },
    pendingRequests: [ RequestSchema ],
    pendingInvitations: [ InvitationSchema ],
    bartons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Barton'
        }
    ]

}, {

    timestamps: true

})

UserSchema.plugin(idValidator);

module.exports = mongoose.model('User', UserSchema, 'users');
