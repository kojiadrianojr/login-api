/*
export function someAction (context) {
}
*/
import API from "./api";

export const register = async ({ commit }, payload) => {
  let response = await API.post("/auth/register", {
    name: payload.name,
    email: payload.email,
    username: payload.username,
    password: payload.password,
    confirm_password: payload.confirm_password
  });
  return response;
};

export const login = async ({ commit }, payload) => {
  let response = await API.post("/auth/login", {
    username: payload.username,
    password: payload.password
  });
  commit("setCredential", response.data);
  return response;
};

export const logout = async ({ commit }, payload) => {
  let response = commit("setCredential", payload);
  return { title: "Goodbye!", desc: "See you again soon!" };
};
