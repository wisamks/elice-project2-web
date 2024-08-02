"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAccessToken = exports.pagesToNumber = void 0;
// 미들웨어 함수들. 미들웨어 많아지면 여기 거쳐서 내보내기. import 많이 안 써도 되도록.
const pagesToNumber_1 = __importDefault(require("./pagesToNumber"));
exports.pagesToNumber = pagesToNumber_1.default;
const authenticateJWT_1 = __importDefault(require("./authenticateJWT"));
exports.authenticateAccessToken = authenticateJWT_1.default;
