import db from '../utils/db.js';

//Phan Huy teachers service
export default {
    async findAll() {
        return await db('teachers');
    },

    async updateTeacher(teacher, id) {
        return await db('teachers').where('teacherID', id).update(teacher);
    },
    async findById(id) {
        const list = await db('teachers').where('teacherID', id);
        if (list.length === 0)
            return null;
        return list[0];
    },
    async findByUserId(userID) {
        const list = await db('teachers').where('userID', userID);
        if (list.length === 0)
            return null;
        return list[0];
    },

    async updateStudentNum(teacherID)
    {
        const list = await db('courses').where('teacherID', teacherID).andWhere('hidden', 0);
        var temp=0;
        for (let i = 0; i < list.length; i++)
        {
            temp = temp + list[i].student_num;
        }
        return await db('teachers').where('teacherID', teacherID).update({ totals_stu: temp });
    },

    async updateRating(teacherID)
    {
        const list = await db('courses').where('teacherID', teacherID).andWhere('hidden', 0);
        var temp=0;
        for (let i = 0; i < list.length; i++)
        {
            temp = temp + list[i].rating;
        }
        var res = temp/(list.length);
        return await db('teachers').where('teacherID', teacherID).update({ rating: res });
    },

    async updateReviews(teacherID)
    {
        const list = await db('courses').where('teacherID', teacherID).andWhere('hidden', 0);
        var temp=0;
        for (let i = 0; i < list.length; i++)
        {
            temp = temp + list[i].rating_num;
        }
        return await db('teachers').where('teacherID', teacherID).update({ reviews: temp });
    },

    async updateCourseNum(teacherID)
    {
        const list = await db('courses').where('teacherID', teacherID).andWhere('hidden', 0);
        return await db('teachers').where('teacherID', teacherID).update({ numCourses: list.length });
    },


 
    async addAVA(image, id) {
        return await db('teachers').where('teacherID', id).update({
            avatar: image
        });
    }, 
    async addBG(image, id) {
        return await db('teachers').where('teacherID', id).update({
            bground: image
        });
    },

}