import db from '../utils/db.js';

export default {
    async findAll()
    {
        return await db('categories');
    },

    async findById(catID) {
        return await db('categories').where('catID', catID).first();
    },

    

}