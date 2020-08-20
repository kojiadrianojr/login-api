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

export const validate = async ({ commit }, payload) => {
  let response = await API.post("/auth/validate", {
    email: payload.email,
    otpToken: payload.otpToken
  });
  commit("validate", response.data.otp_granted);
  return response;
};

export const generate_otp = async ({ commit }, payload) => {
  let response = API.post(
    "/auth/generate_otp",
    {
      email: payload.email
    },
    { headers: { Authorization: `bearer ${payload.jwtToken}` } }
  );
};
