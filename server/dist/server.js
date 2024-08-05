"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const __config_1 = require("./config/index.js");
const __config_2 = require("./config/index.js");
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const usersRouter_1 = __importDefault(require("./routers/usersRouter"));
const exchangePostsRouter_1 = __importDefault(require("./routers/exchangePostsRouter"));
const __passport_config_1 = __importDefault(require("./passport-config/index.js"));
(0, __passport_config_1.default)();
const app = (0, express_1.default)();
// 클라이언트가 다른 포트에서 api를 호출할 수 있게 하는 설정
app.use((0, cors_1.default)({
    origin: __config_1.clientDomain,
    credentials: true,
}));
// body랑 cookie를 읽을 수 있도록 하는 설정
// 만약 쿠키 secret 설정을 하게 된다면 cookieParser(해당 시크릿) 으로 넣어줘야 함
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize()); // 패스포트 초기화
// 임시 동작 확인용: 나중에 삭제!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!꼭!!!!!!!!!!!!!!!!!!!!!!!
app.get('/', (req, res) => {
    res.send('hello typescript');
});
//라우터
app.use('/api/auth', authRouter_1.default);
app.use('/api/users', usersRouter_1.default);
app.use('/api/exchange-posts', exchangePostsRouter_1.default);
// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
    if (err.statusCode >= 500 || !err.statusCode) {
        console.error(err);
    }
    const statusCode = err.statusCode >= 400 ? err.statusCode : 400;
    const message = err.message ? err.message : '에러가 발생했습니다.';
    return res.status(statusCode).json({ error: message });
});
app.listen(__config_2.serverPort, () => {
    console.log(`server started on Port ${__config_2.serverPort}`);
});
