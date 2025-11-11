
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
   GET_CLASS_LIST: '/admin/class/schedule/page'
};

const host = '';
Object.keys(APIS).forEach((key) => {
    APIS[key] = host + APIS[key];
});

export default APIS;
