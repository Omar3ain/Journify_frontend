import axios from 'axios';
import { API_BASE_URL }  from '../../../baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
const URL = `${API_BASE_URL}user/`;

const login = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(
    URL + "login/",
    userData,
    config
  );

  if (response.data) {
    await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

const register = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  };

  const response = await axios.post(
    URL + "create/",
    userData,
    config
  );

  return response.data;
};

const logout = async () => {
  await AsyncStorage.removeItem("user");
};

const updateUserInfo = async (userData, token, id) => {
  const user = JSON.parse(await AsyncStorage.getItem("user"));
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `token ${ token }`
    },
  };
  const response = await axios.patch(
    URL + `update/${ id }/`,
    userData,
    config
  );
  await AsyncStorage.setItem(
    "user",
    JSON.stringify({ ...user, ...response.data })
  );
  return response.data;
};

const authService = {
  login,
  register,
  logout,
  updateUserInfo,
};

export default authService;