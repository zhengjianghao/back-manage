
const APIS = {
   LOGIN: '/admin/login',
   GET_CD_LIST: '/admin/court/page',
   ADD_CD: '/admin/court/add',
   GET_COACH_LIST: '/admin/coach/page',
   ADD_COACH: '/admin/coach/add',
   GET_MEMBER_LIST: '/admin/student/page',
   ADD_MEMBER: '/admin/student/add',
   GET_COACH_MONEY_CONFIG: '/admin/coach/course/config/list/',
   SAVE_COACH_MONEY_CONFIG: '/admin/coach/course/config/save',
   GET_CLASS_LIST: '/admin/class/schedule/page',
   GET_RECORD_LIST: '/admin/student/charge/page',
   ADD_RECORD: '/admin/student/charge/add',
   GET_COURSE_PAGE: '/admin/course/page',
   ADD_COURSE: '/admin/course/add',
   DEL_COURSE: '/admin/course/delete',
   UPDATE_COURSE: '/admin/course/update',
   GET_HOME_DATA: '/admin/homepage/data',
   GET_HOME_BIRTHDAY: '/admin/homepage/student/birthday/week',
   GET_HOME_CD_STATUS: '/admin/homepage/court/status',
   GET_HOME_KC: '/admin/homepage/classSchedule/listSchedules',
   GET_ALL_CK: '/admin/course/list'
};

const host = '';
Object.keys(APIS).forEach((key) => {
    APIS[key] = host + APIS[key];
});

export default APIS;
