import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';
import { termReducer } from './termRelated/termSlice';
import { gradingReducer } from './gradeRelated/gradeSlice';
import { HeadTeacherCommentReducer } from './hmRelated/hmSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer,
        term: termReducer,
        grading:gradingReducer,
        HeadTeacherComment:HeadTeacherCommentReducer
    },
});

export default store;
