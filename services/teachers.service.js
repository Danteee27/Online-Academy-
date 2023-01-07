import db from "../utils/db.js";

//Phan Huy teachers service
export default {
  async findAll() {
    return await db("teachers");
  },
  async add(entity) {
    return await db("teachers").insert(entity);
  },
  async updateEmail(email, id) {
    return await db("teachers").where("teacherID", id).update(email);
  },
  async updateTeacher(teacher, id) {
    return await db("teachers").where("teacherID", id).update(teacher);
  },
  async findById(id) {
    const list = await db("teachers").where("teacherID", id);
    if (list.length === 0) return null;
    return list[0];
  },
  async findByUserId(userID) {
    const list = await db("teachers").where("userID", userID);
    if (list.length === 0) return null;
    return list[0];
  },

  async updateStudentNum(teacherID) {
    const list = await db("courses")
      .where("teacherID", teacherID)
      .andWhere("hidden", 0);
    let x = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].student_num !== null) {
        x = parseInt(x) + parseInt(list[i].student_num);
      }
    }
    return await db("teachers")
      .where("teacherID", teacherID)
      .update({ totals_stu: parseInt(x) });
  },

  async updateRating(teacherID) {
    const list = await db("courses")
      .where("teacherID", teacherID)
      .andWhere("hidden", 0);
    var temp = 0;
    var x = parseFloat(temp);
    if (list.length !== 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].rating !== null) {
          x = parseFloat(x) + parseFloat(list[i].rating);
        }
      }

      x = parseFloat(parseFloat(x) / parseFloat(list.length));
    }
    return await db("teachers")
      .where("teacherID", teacherID)
      .update({ rating: parseFloat(x) });
  },

  async updateReviews(teacherID) {
    const list = await db("courses")
      .where("teacherID", teacherID)
      .andWhere("hidden", 0);
    var temp = 0;
    var x = parseInt(temp);
    for (let i = 0; i < list.length; i++) {
      if (list[i].rating_num !== null) {
        x = parseInt(x) + parseInt(list[i].rating_num);
      }
    }
    return await db("teachers")
      .where("teacherID", teacherID)
      .update({ reviews: parseInt(x) });
  },

  async updateCourseNum(teacherID) {
    const list = await db("courses")
      .where("teacherID", teacherID)
      .andWhere("hidden", 0);
    return await db("teachers")
      .where("teacherID", teacherID)
      .update({ numCourses: list.length });
  },

  async addAVA(image, id) {
    return await db("teachers").where("teacherID", id).update({
      avatar: image,
    });
  },
  async addBG(image, id) {
    return await db("teachers").where("teacherID", id).update({
      bground: image,
    });
  },
};
