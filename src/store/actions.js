import apiInstance from '../config/axios';
import {baseUrl,history} from '../utils/constants';

export const login = () => async (dispatch) => {
  const response = await apiInstance.get(`${baseUrl}/accounts/information`,  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + localStorage.getItem('access_token')
    },
  })
  const userData = response.data
  return dispatch({
    type: 'LOGIN',
    payload: userData
  });
};

export const remove_token = () => {
  localStorage.removeItem('access_token');
  history.push("/login");
  return {
    type: 'LOGOUT',
  };
};

export const logout = () => {
  localStorage.removeItem('access_token');
  return {
    type: 'LOGOUT',
  };
};


