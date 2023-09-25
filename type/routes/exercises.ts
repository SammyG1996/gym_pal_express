import app from "../app";
import { Exercises } from "../models/exercises";
import express from "express";

const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        const collection = await Exercises.getExercises().catch(console.error);
        res.send(collection)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    return
  })

  export default router