"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const config = {
    clientID: config_1.googleClientId,
    clientSecret: config_1.googleClientPw,
    callbackURL: '/api/auth/google/callback',
};
