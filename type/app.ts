"use strict";


import express, {Express, Request, Response, NextFunction} from "express";
import cors from "cors"
import { Exercises } from "./models/exercises";


import { ExpressError, NotFoundError }from "./expressError";


// const { authenticateJWT } = require("./middleware/auth");
// const authRoutes = require("./routes/auth");
import exercisesRoutes from "./routes/exercises"


// import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(morgan("tiny"));
// app.use(authenticateJWT);

app.use("/exercises", exercisesRoutes); /** Route will be used to validate loggin  */

app.get('/', async (req, res) =>{
  res.send(`<h1>WELCOME TO GYM PAL API</h1>`)
})

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