"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverPort = exports.googleClientPw = exports.googleClientId = exports.pool = void 0;
// 설정
const db_1 = __importDefault(require("./db"));
exports.pool = db_1.default;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const googleClientId = process.env.GOOGLE_CLIENT_ID;
exports.googleClientId = googleClientId;
const googleClientPw = process.env.GOOGLE_CLIENT_PW;
exports.googleClientPw = googleClientPw;
const serverPort = process.env.SERVER_PORT;
exports.serverPort = serverPort;
