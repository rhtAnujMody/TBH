import logo from './logo';
import back from './back';
import login from './login';
import buildings from './buildings';
import home from './home';
import male from './male';
import female from './female';
import dropdown from './dropdown';
import close from './close';
import uploadImage from './uploadImage';

export default {
  logo,
  back,
  buildings,
  male,
  female,
  close,
  dropdown,
  uploadImage,
  ...login,
  ...home,
};
