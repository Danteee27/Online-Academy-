import express from 'express';
import lecturesService from "../services/lectures.service.js";

const router = express.Router();

router.get('/', async function(req, res) {
    const list = await lecturesService.findAll();
    res.json(list);
})



export default router;