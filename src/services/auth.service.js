import axios from "axios";

const API_URL = "/backend/auth";

const signup = (email, password) => {
  return axios
    .post(API_URL + "/signup", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/login", {
      email,
      password,
    })
    .then((response , err) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};


const logout = () => {
  localStorage.removeItem("user");
};
const resetPassword = (email, token , pwd) => {
  return axios
    .post(API_URL + `/reset-password/${email}/${token}` , {
      password: pwd})
    .then((response) => {
      if (response.data.token) {
        logout();
      }
      return response.data;
    });}
      


const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  resetPassword
};

export default authService;
