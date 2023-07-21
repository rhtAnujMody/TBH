import logo from './logo';
import back from './back';
import login from './login';
import buildings from './buildings';
import home from './home';

export default {
  logo,
  back,
  buildings,
  ...login,
  ...home,
};
