import express from 'express';
import fieldsService from "../services/fields.service.js";

const router = express.Router();

router.get('/', async function(req, res) {
    const list = await fieldsService.findAll();
    res.json(list);
})



export default router;