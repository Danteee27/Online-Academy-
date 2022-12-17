import db from '../utils/db.js';

export default {
    findAll() {
        return db('courses');
    },

    findAllByCatID(catID) {
        return db('courses').where('catID', catID);
    },

    findPageByCatID(catID, limit, offset) {
        return db('courses').where('CatID', catID).limit(limit).offset(offset);
    },

    async countByCatId(catId) {
        const list = await db('courses').where('CatID', catId).count({
            amount: 'courseID'
        });
        return list[0].amount;
    },

    async findByDetail(catID, id) {
        const list = await db('courses').where('catID', catID).where('courseID', id);
        return list[0];
    }
};