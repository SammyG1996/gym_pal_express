"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const exercises_1 = require("./models/exercises");
const expressError_1 = require("./expressError");
// const { authenticateJWT } = require("./middleware/auth");
// const authRoutes = require("./routes/auth");
// import morgan from "morgan";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use(morgan("tiny"));
// app.use(authenticateJWT);
// app.use("/auth", authRoutes); /** Route will be used to validate loggin  */
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield exercises_1.Exercises.getExercises().catch(console.error);
    res.send(collection);
}));
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
