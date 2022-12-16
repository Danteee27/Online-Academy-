import db from '../utils/db.js';

export default {
    findAll() {
        return db('categories');
    },

    findAllByField(fieldID) {
        return db('categories').where('fieldID', fieldID);
    }
};