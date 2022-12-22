create table categories
(
    catID      int          not null
        primary key,
    catName    varchar(100) not null,
    fieldID    int          not null,
    course_num int          not null
);

create table courses
(
    courseID      int auto_increment
        primary key,
    courseName    varchar(100)      not null,
    catID         int               not null,
    instructor    varchar(100)      not null,
    rating        decimal(2, 1)     null,
    rating_num    int               null,
    student_num   int               null,
    image         mediumtext        null,
    price         int               not null,
    promotion     int               not null,
    lec_num       int               not null,
    description   mediumtext        null,
    hidden        tinyint default 0 not null,
    teacherNumber int               not null,
    completed     tinyint default 0 not null
);

create table fields
(
    fieldID   int         not null
        primary key,
    fieldName varchar(45) not null,
    hidden    tinyint     not null
);

create table lectures
(
    lecID       int auto_increment
        primary key,
    lecName     varchar(100) null,
    courseID    int          null,
    videoURL    mediumtext   null,
    `order`     int          null,
    description mediumtext   null
);

create table teachers
(
    teacherID   int          not null
        primary key,
    teacherName varchar(100) null,
    numCourses  int          null,
    teacherBio  mediumtext   null,
    description mediumtext   null,
    rating      float        null,
    totals_stu  int          null,
    reviews     int          null,
    websites    mediumtext   null,
    fb_link     mediumtext   null,
    linkedin    mediumtext   null,
    avatar      mediumtext   null,
    bground     mediumtext   null
);

create table users
(
    userID      int          not null
        primary key,
    username    varchar(45)  not null,
    password    varchar(200) not null,
    email       varchar(100) not null,
    userRole    varchar(70)  not null,
    courses_num int          null
);

