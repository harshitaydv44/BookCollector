import express from 'express';
import { getBook,createBook } from '../controller/bookcontroller.js';

const router = express.Router();

router.get("/",getBook);
router.post("/",createBook);
export default router;