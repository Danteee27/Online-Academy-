import express from 'express';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import usersService from '../services/users.service.js';

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('vwAccount/register', {
        layout: false
    });
})

router.post('/register', async function (req, res) {
    const rawPassword = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(rawPassword, salt);

    const dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const user = {
        password: hash,
        name: req.body.name,
        dob: dob,
        email: req.body.email,
        role: 'ROLE.USER'
    }
    await usersService.add(user);
    res.render('vwAccount/register', {
        layout: false
    });
});

router.get('/login', async function (req, res) {
    res.render('vwAccount/login', {
        layout: false
    })
})

router.post('/login', async function (req, res) {
    const user = await usersService.findByEmail(req.body.email);

    if (user === null) {
        return res.render('vwAccount/login', {
            layout: false,
            err_message: 'Invalid username or password.'
        });
    }

    const ret = bcrypt.compareSync(req.body.password, user.password);
    if (ret === false) {
        return res.render('vwAccount/login', {
            layout: false,
            err_message: 'Invalid username or password.'
        });
    }

    delete user.password;

    req.session.auth = true;
    req.session.authUser = user;

    const url = req.session.retUrl || '/';
    res.redirect(url);
});



router.get('/is-available', async function (req, res) {
    const email = req.query.email;

    const user = await usersService.findByEmail(email);

    if (user === null) {
        return res.json(true);
    }

    res.json(false);
});

export default router;