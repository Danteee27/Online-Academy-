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
        console.log(db('fields').where('fieldID',fieldID).update(field));
        return db('fields').where('fieldID',fieldID).update(field);
    }
    ,
    hide(fieldID)
    {
        console.log(db('fields').where('fieldID',fieldID).update({fieldID: '0', fieldName: 'Deleted'}))
        return db('fields').where('fieldID',fieldID).update({fieldID: '0', fieldName: 'Deleted'});
    },
    unhide(fieldID)
    {
        return db('fields').where('fieldID',fieldID).update({ hidden: '0' });
    }
    ,
    del(fieldID)
    {
        return db('fields').where('fieldID',fieldID).del();
    }


}