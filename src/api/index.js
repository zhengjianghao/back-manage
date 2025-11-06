
const APIS = {
   LOGIN: '/admin/login',
   GET_CD_LIST: '/admin/court/page',
   ADD_CD: '/admin/court/add',
   GET_COACH_LIST: '/admin/coach/page',
   ADD_COACH: '/admin/coach/add',
   GET_MEMBER_LIST: '/admin/member/page',
   ADD_MEMBER: '/admin/member/add'
};

const host = '';
Object.keys(APIS).forEach((key) => {
    APIS[key] = host + APIS[key];
});

export default APIS;
