import db from '../utils/db.js';

export default {
    async findAll()
    {
        return await db('fields');
    },

    findById(fieldID) {
        return db('fields').where('fieldID', fieldID).first();
    },

    add(field)
    {
        return db('fields').insert(field);
    },

    update(fieldID, field)
    {
        return db('fields').where('fieldID',fieldID).update(field);
    }
    ,
    hide(fieldID)
    {
        return db('fields').where('fieldID',fieldID).update({ hidden: 1 });
    },
    unhide(fieldID)
    {
        return db('fields').where('fieldID',fieldID).update({ hidden: 0 });
    }
    ,
    del(fieldID)
    {
        return db('fields').where('fieldID',fieldID).del();
    }


}