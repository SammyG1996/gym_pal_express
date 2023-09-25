import { Auth } from "../models/auth";
import express from "express";
import { createToken } from "../helpers/tokens";
import { NotFoundError } from "../expressError";
const router = express.Router();


router.post('/token', async (req, res, next) =>{
    const {username, password} = req.body;
    try {
        const user = await Auth.authUser(username, password)
        if(!user) throw new NotFoundError()
        const token = createToken(user.username);
        return res.json({ token, user });
    } catch (err) {
        return next(err);
    }
  })

  export default router