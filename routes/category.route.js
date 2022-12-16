//import categoryService from '../services/category.service.js';
import express from 'express';

const router = express.Router();

router.get("/", function(req, res) {
    res.render('vwUser/index');
});

export default router;