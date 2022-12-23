import db from '../utils/db.js';

export default {
    async findById(id) {
        const list = await db('server-variables').where('svID', id);
        if (list.length === 0)
            return null;
        return list[0];
    },
    add(entity) {
        return db('server-variables').insert(entity);
    },
    remove(svID) {
        return db('server-variables').where('svID', svID).del();
    },
    update(svID, entity) {
        return db('server-variables').where('svID', svID).update(entity);
    }
};