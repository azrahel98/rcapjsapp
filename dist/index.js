"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const login_1 = require("./routes/login");
const doc_1 = require("./routes/doc");
const employ_1 = require("./routes/employ");
const jwt_1 = require("./routes/auth/jwt");
const asistencia_1 = require("./routes/asistencia");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use('/login', login_1.router);
app.use('/doc', jwt_1.verifyToken, doc_1.dRoute);
app.use('/employ', jwt_1.verifyToken, employ_1.eroute);
app.use('/asist', jwt_1.verifyToken, asistencia_1.asRoute);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
