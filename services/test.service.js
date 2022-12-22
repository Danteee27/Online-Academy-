import db from '../utils/db.js';

export default {
    async updateOtherLectureOrders(order, courseID)
    {
        const lastOrder = await db('lectures').where('courseID', courseID).select(max(order));
        for (var i = order; i <= lastOrder; i++)
        {
            var temp = db('lectures').where('courseID', courseID).andWhere('order','=', i).select(order);
            db('lectures').where('courseID', courseID).andWhere('order','>=', i).update('order', temp+1);
        }
        return true;
    },
    hideCourse(courseID)
    {
        return db('courses').where('courseID', courseID).update('hidden',1);
    }
    getRating(rating,courseID)
    {
        const rating_num = db('courses').where('cousreID', courseID).select('rating_num');
        const base_rating = db('courses').where('cousreID', courseID).select('rating');
        db('courses').where('courseID', courseID).update('rating',(rating*rating_num+base_rating)/rating_num+1);
        return db('courses').where('cousreID', courseID).update('rating_num',rating_num+1);
    }
}