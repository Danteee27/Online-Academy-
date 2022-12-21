import db from '../utils/db.js';

export default {
    async findAll() {
        return await db('categories');
    },

    findById(catID) {
        return db('categories').where('catID', catID).first();
    },

    findByFieldID(fieldID) {
        return db('categories').where('fieldID', fieldID);
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