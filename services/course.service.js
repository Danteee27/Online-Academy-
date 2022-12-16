import db from '../utils/db.js';

export default {
    findAll() {
        return db('courses');
    },

    findAllByCatID(catID) {
        return db('courses').where('catID', catID);
    }
};