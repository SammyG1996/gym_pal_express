"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const expressError_1 = require("./expressError");
// const { authenticateJWT } = require("./middleware/auth");
// const authRoutes = require("./routes/auth");
const exercises_1 = __importDefault(require("./routes/exercises"));
// import morgan from "morgan";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use(morgan("tiny"));
// app.use(authenticateJWT);
app.use("/exercises", exercises_1.default); /** Route will be used to validate loggin  */
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
