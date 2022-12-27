import express from 'express';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import usersService from '../services/users.service.js';
import OTPGenerator from "../auth/OTPGenerator.js";
import OTPMailSender from "../auth/OTP-MailSender.js";

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
        role: 'ROLE.USER',
    }
    await usersService.add(user);



    res.redirect('/users/email-verify/' + req.body.email);
});

router.get('/email-verify/:email', async (req, res) => {
    const email = req.params.email;
    const otp = OTPGenerator.generateOTP();
    await OTPMailSender.sendMail({
        to: email,
        otp: otp,
    })

    res.render('vwAccount/email-verify', { email: email,otpGenerated: otp, err_message: "Please enter your OTP here:"});
});

router.post('/email-verify', async (req, res) => {
    if(req.body.otp === req.body.otpGenerated)
    {
        const user = await usersService.findByEmail(req.body.email);
        await usersService.update(user.userID, {verifyEmail: 1});
        res.redirect('/users/login');
        res.render('vwUser/login' , {err_message: "Register completed successfully. You can now login!"});
    }
    else
    {
        res.render('vwAccount/email-verify', {
            email: req.body.email,
            otpGenerated: req.body.otpGenerated,
            err_message: "Please enter your OTP here:",
            redo_message: "Incorrect OTP, we have sent another mail, please try again!"
        });
    }
})

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

    if(user.verifyEmail === 0)
    {
        return res.redirect('/users/email-verify/' + user.email);
    }

    if (user.banned === 1) {
        return res.render('vwAccount/login', {
            layout: false,
            err_message: 'Your account has been banned. Contact administrator!'
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

router.post('/logout', async function (req, res) {
    req.session.auth = false;
    req.session.authUser = null;

    const url = req.headers.referer || '/';
    res.redirect(url);
});

router.get('/settings/:id', async (req, res) => {
    if (req.session.authUser === null) {
        return res.redirect('/');
    }

    if (req.session.authUser.userID != req.params.id) {
        return res.redirect('/');
    }

    const user = await usersService.findById(req.params.id);

    res.render('vwAccount/settings', {
        user: user
    });
})

router.post('/settings', async (req, res) => {

    const userID = req.body.userID;
    const ret = await usersService.update(userID, req.body);

    res.locals.authUser.name = req.body.name;
    res.redirect('/users/settings/' + userID);
})


router.get('/profile/:id', async (req, res) => {
    const user = await usersService.findById(req.params.id);

    res.render('vwAccount/profile', {
        user,
    });
})

router.get('/profile-settings/:id', async (req, res) => {
    if (req.session.authUser === null) {
        return res.redirect('/');
    }

    if (req.session.authUser.userID != req.params.id) {
        return res.redirect('/');
    }
    const user = await usersService.findById(req.params.id);

    res.render('vwAccount/profile-settings', {
        user,
    })
})

router.post('/profile-settings', async (req, res) => {
    const userID = req.body.userID;
    const ret = await usersService.update(userID, req.body);

    res.locals.authUser.introduction = req.body.introduction;
    res.redirect('/users/profile-settings/' + userID);
})

router.get('/change-password/:id', async (req, res) => {
    if (req.session.authUser === null) {
        return res.redirect('/');
    }


    const user = await usersService.findById(req.params.id);

    res.render('vwAccount/change-password', {
        user
    });
})

router.post('/change-password', async (req, res) => {
    const userID = req.body.userID;

    const user = await usersService.findById(userID);
    if (user === null) {
        return res.redirect('/');
    }
    const ret = bcrypt.compareSync(req.body.oldPassword, user.password) && req.body.newPassword === req.body.confirmPassword;
    if (ret === false) {
        return res.render('vwAccount/change-password', {
            err_message: 'Invalid password.'
        });
    } else {
        user.password = bcrypt.hashSync(req.body.newPassword, 10);
        await usersService.update(userID, user);

        res.redirect('/users/settings/' + userID);
        return res.render('vwAccount/settings', {
            user
        })
    }

})





export default router;