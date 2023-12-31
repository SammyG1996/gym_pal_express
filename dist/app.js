"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const expressError_1 = require("./expressError");
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xssShield_1 = __importDefault(require("xss-shield/build/main/lib/xssShield"));
// const { authenticateJWT } = require("./middleware/auth");
// const authRoutes = require("./routes/auth");
const exercises_1 = __importDefault(require("./routes/exercises"));
const auth_1 = __importDefault(require("./routes/auth"));
// import morgan from "morgan";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, helmet_1.default)()); //secures HTTP HEADER
app.use((0, express_mongo_sanitize_1.default)()); //secures JSON body from injection attacks
app.use((0, xssShield_1.default)()); //secures the app from XSS attacks
// app.use(morgan("tiny"));
// app.use(authenticateJWT);
app.use("/exercises", exercises_1.default); /** route is used to retreive exersices  */
app.use("/auth", auth_1.default); /**   */
/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new expressError_1.NotFoundError());
});
/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test")
        console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
    return res.status(status).json({
        error: { message, status },
    });
});
exports.default = app;
