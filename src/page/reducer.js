import { reducer as HomeReducer } from './home/index';
import { reducer as userReducer } from './user/index';
import { reducer as productReducer } from './product/index';
import { reducer as categoryReducer } from './category/index';
import { reducer as orderReducer } from './order';
import { reducer as jiaolianReducer } from './jiaolianManage';
import { reducer as memberReducer } from './memberManage';
import { reducer as dataReducer } from './dataManage';

const reducer = {
  home: HomeReducer,
  ...userReducer,
  ...productReducer,
  ...categoryReducer,
  ...orderReducer,
  ...jiaolianReducer,
  ...memberReducer,
  ...dataReducer
};

export default reducer;
