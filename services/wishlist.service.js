import db from '../utils/db.js';

export default {
    findAll() {
        return db('wishlists');
    },

    async isInWishList(userID, courseID) {
        const list = await db('wishlists').where('userID', userID).where('courseID', courseID);
        if (list.length === 0)
            return false;
        return true;
    },

    async countByUserID(userID) {
        const list = await db('wishlists').where('userID', userID).count({
            amount: 'courseID'
        });
        return list[0].amount;
    },

    findByUserID(userID, limit, offset) {
        return db('wishlists').where('userID', userID).limit(limit).offset(offset);
    },

    add(userID, courseID) {
        return db('wishlists').insert(userID, courseID);
    },

    del(userID, courseID) {
        return db('wishlists').where('userID', userID).where('courseID', courseID).del();
    }
};