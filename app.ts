"use strict";


import express, {Express, Request, Response, NextFunction} from "express";
import cors from "cors"


import { ExpressError, NotFoundError }from "./expressError";


// const { authenticateJWT } = require("./middleware/auth");
// const authRoutes = require("./routes/auth");


// import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(morgan("tiny"));
// app.use(authenticateJWT);

// app.use("/auth", authRoutes); /** Route will be used to validate loggin  */

app.get('/', (req, res) =>{
  res.send('Hello From Express and Typescript!!!!!')
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