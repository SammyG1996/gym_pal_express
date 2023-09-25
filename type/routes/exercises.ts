import app from "../app";
import { Exercises } from "../models/exercises";
import express from "express";

const router = express.Router();

router.get('/', async (req, res, next) =>{
    try {
        const collection = await Exercises.getExercises().catch(console.error);
        return res.send(collection)
    } catch (err) {
        return next(err);
    }
  })

  export default router