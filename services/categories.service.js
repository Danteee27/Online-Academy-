import db from '../utils/db.js';

export default {
    async findAll() {
        return await db('categories');
    },

    async findById(catID) {
        const list = await db('categories').where('catID', catID);
        if (list.length === 0) {
            return null;
        }

        return list[0];
    },

    async findByFieldID(fieldID) {
        const list = await db('categories').where('fieldID', fieldID);
        if (list.length === 0) {
            return null;
        }

        return list[0];
    },

    async findAllByFieldID(fieldID) {
        const list = await db('categories').where('fieldID', fieldID);
        if (list.length === 0) {
            return null;
        }

        return list;
    },

    async countByFieldID(fieldID) {
        const list = await db('categories').where('fieldID', fieldID).count({
            amount: 'catID'
        });

        return list[0].amount;
    },

    add(category) {
        console.log(category);
        return db('categories').insert(category);
    },
    update(catID, newCategory) {
        return db('categories').where('catID', catID).update(newCategory);
    },
    hide(catID) {
        return db('categories').where('catID', catID).update({
            hidden: 1
        });
    },
    unhide(catID) {
        return db('categories').where('catID', catID).update({
            hidden: 0
        });
    },
    del(catID) {
        return db('categories').where('catID', catID).del();
    },

    addCatNameToCourse(list, catName) {
        let n = list.length;
        for (let i = 0; i < n; i++)
            list[i].catName = catName;
    }

}