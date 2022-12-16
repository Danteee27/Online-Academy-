import express from 'express';
import coursesService from "../services/courses.service.js";

const router = express.Router();

router.get('/', async function(req, res) {
    const list = await coursesService.findAll();
    res.json(list);
})



export default router;