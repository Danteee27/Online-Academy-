import db from '../utils/db.js';

//Phan Huy teachers service
export default {
    async findAll()
    {
        return await db('teachers');
    },

    async findById(id) {
        const list = await db('teachers').where('teacherID', id);
        console.log(list);
        if (list.length === 0)
            return null;
        return list[0];
    },

}