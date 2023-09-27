import { Auth } from "../models/auth";
import express from "express";
import { createToken } from "../helpers/tokens";
import { BadRequestError, NotFoundError } from "../expressError";
import jwt_decode from "jwt-decode";
const router = express.Router();
import { verifyGoogleToken } from "../middleware/auth";
import { error } from "console";


router.post('/token', async (req, res, next) =>{
    const {username, password} = req.body;
    try {
        const user = await Auth.authUser(username, password, next)
        if(!user) throw new NotFoundError()
        const token = createToken(user.username);
        return res.json({ token, user });
    } catch (err) {
        return next(err);
    }
  })

  /** POST /auth/oauth:  { Google JWT } => { token, username }
 * 
 * After verifying Googles JWT the user is found and then a new JWT token is return with the username 
 * which can be used to authenticate further requests
 * 
 * Authorization required: none
 * 
 */
router.post("/oauth", verifyGoogleToken, async function (req, res, next) {
    try {
      const { credential } = req.body;
      const decodedJWT:{email:string} = jwt_decode(credential);
      const {email} = decodedJWT
      const user = await Auth.getUserDataAfterOAuth(email, next);
      if(!user)throw new NotFoundError();
      const token = createToken(user.username);
      return res.json({ token, user });
    } catch (err) {
      return next(err);
    }
  });


/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
  try {
    const newUser = await Auth.register({ ...req.body, isAdmin: false }, next);
    if(!newUser) throw new BadRequestError()
    const token: string | void = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});


  export default router