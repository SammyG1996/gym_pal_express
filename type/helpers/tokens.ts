import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";


/** return signed JWT from user data. */
export function createToken(username:string | null) {
  if(!username) return 
  let payload = {
    username: username,
  };

  return jwt.sign(payload, SECRET_KEY);
}


