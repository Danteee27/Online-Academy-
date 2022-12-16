import express from 'express';
import categoriesService from "../services/categories.service.js";

const router = express.Router();

router.get('/', async function(req, res) {
    const list = await categoriesService.findAll();
    res.json(list);
})



export default router;