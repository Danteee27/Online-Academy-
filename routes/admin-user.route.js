import express from 'express';
import usersService from '../services/users.service.js';


const router = express.Router();

router.get('/', async function(req, res) {
    const list = await usersService.findAll();
    res.render('vwAdmin/byUser', {
        list: list,
        empty: list.length === 0,
    });
})

// ROLE.ADMIN ONLY
router.post('/del', async function(req, res) {

    const userID = req.body.userID || 0;

    const user = await usersService.findById(userID);

    if(user.role === 'ROLE.ADMIN' || user.role === 'ROLE.TEACHER')
    {
        return res.redirect('/admin/users');
    }
    const ret = await usersService.del(userID);
    res.redirect('/admin/users');

})

router.get('/edit', async function (req, res) {
    const id = req.query.id || 0;
    const user = await usersService.findById(id);
    if (user === null) {
        return res.redirect('/admin/users');
    }

    res.render('vwAdmin/vwUser/edit', {
        user: user
    });
});

router.post('/edit', async function(req, res) {
    const userID = req.body.userID || 0;
    const affected_rows = await usersService.update(req.body.userID, req.body)

    res.redirect('/admin/users');
})

router.post('/ban', async (req, res) => {
    const userID = req.body.userID || 0;
    await usersService.ban(userID);

    res.redirect('/admin/users');
})

router.post('/unban', async (req, res) => {
    const userID = req.body.userID || 0;
    await usersService.unban(userID);

    res.redirect('/admin/users');
})

export default router;