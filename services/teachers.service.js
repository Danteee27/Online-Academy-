import db from '../utils/db.js';

//Phan Huy teachers service
export default {
    async findAll()
    {
        return await db('teachers');
    },

    async updateTeacher(teacher, id)
    {
         return await db('teachers').where('teacherID',id).update(teacher);
    },
    async findById(id) {
        const list = await db('teachers').where('teacherID', id);
        console.log(list);
        if (list.length === 0)
            return null;
        return list[0];
    }

    ,
    async addAVA(image, id) {
        return await db('teachers').where('teacherID', id).update({avatar:image});
    },
    async addBG(image, id) {
        return await db('teachers').where('teacherID', id).update({bground:image});
    },

}