import { Exercises } from "../models/exercises";
import express from "express";
const router = express.Router();

/**
 * This route will get all the exercises in the DB and return it 
 */
router.get('/', async (req, res, next) =>{
    try {
        const collection = await Exercises.getExercises().catch(console.error);
        return res.json(collection)
    } catch (err) {
        return next(err);
    }
  })

  export default router