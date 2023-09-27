"use strict";

/** Convenience middleware to handle common auth cases in routes. */

import jwt from "jsonwebtoken";
import { SECRET_KEY, CLIENT_ID } from "../config";
import { ExpressError, UnauthorizedError } from "../expressError";
import { OAuth2Client } from "google-auth-library";
import { Request, Response, NextFunction } from "express";
const client = new OAuth2Client(CLIENT_ID); // Replace CLIENT_ID with your actual client ID


/**
 * Middleware to use when you need to authenticate a Google JWT token
 * 
 */

export async function verifyGoogleToken(req:Request, res: Response, next: NextFunction) {
    try {
      if(!req.body) throw new UnauthorizedError()
      const token = req.body.credential
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, // Replace CLIENT_ID with your actual client ID
      });
      const payload = ticket.getPayload();
      // Check if the user's email is verified and any other necessary checks
      if(!payload) throw new UnauthorizedError()
      if (payload.email_verified) {
        return next();
      } else {
        throw new UnauthorizedError();
      }
    } catch (err) {
      return next(err)
    }
  }
  