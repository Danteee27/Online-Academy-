import db from '../utils/db.js';

export default {
    findAll() {
        return db('user-lectures');
    },
    findByDetail(userID, lecID) {
        return db('user-lectures').where('userID', userID).where('lecID', lecID);
    },
    async getStatus(userID, lecID) {
        const list = await db('user-lectures').where('userID', userID).where('lecID', lecID);
        if (list[0].completed === 0)
            return false;
        else
            return true;
    },
    add(entity) {
        return db('user-lectures').insert(entity);
    },
    del(userID, lecID) {
        return db('user-lectures').where('userID', userID).where('lecID', lecID).del();
    },
    update(userID, lecID, completed) {
        return db('user-lectures').where('userID', userID).where('lecID', lecID).update('completed', completed);
    }
};