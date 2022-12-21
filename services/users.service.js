import db from '../utils/db.js';

export default {
    async findAll()
    {
        return await db('users');
    },

    async findById(userID) {
        const list = await db('users').where('userID', userID);
        if(list.length === 0)
            return null;
        return list[0];
    },
    async findByEmail(email) {
        const list = await db('users').where('email', email);
        console.log(list.length);
        if(list.length === 0)
            return null;
        return list[0];
    }
    ,

    add(user)
    {
        return db('users').insert(user);
    },

    update(userID, user)
    {
        return db('users').where('userID',userID).update(user);
    }
    ,
    ban(userID)
    {

        return db('users').where('userID',userID).update({banned: 1});
    },
    unban(userID)
    {
        return db('users').where('userID',userID).update({banned: 0});

    }
    ,
    del(userID)
    {
        return db('users').where('userID',userID).del();
    }


}