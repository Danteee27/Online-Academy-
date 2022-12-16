import db from '../utils/db.js';

export default {
    async findAll()
    {
        return await db('fields');
    },

    async findById(fieldID) {
        return await db('fields').where('fieldID', fieldID).first();
    },



}