"use strict";


import express, {Express, Request, Response, NextFunction} from "express";
import cors from "cors"
import { ExpressError, NotFoundError }from "./expressError";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xssShield from "xss-shield/build/main/lib/xssShield";



// const { authenticateJWT } = require("./middleware/auth");
// const authRoutes = require("./routes/auth");
import exercisesRoutes from "./routes/exercises"
import authRoutes from "./routes/auth"


// import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet()); //secures HTTP HEADER
app.use(mongoSanitize()); //secures JSON body from injection attacks
app.use(xssShield()) //secures the app from XSS attacks



// app.use(morgan("tiny"));
// app.use(authenticateJWT);

app.use("/exercises", exercisesRoutes); /** route is used to retreive exersices  */
app.use("/auth", authRoutes); /**   */


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
  });
  
  /** Generic error handler; anything unhandled goes here. */
  app.use(function (err: ExpressError, req: Request, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });
  
  export default app;