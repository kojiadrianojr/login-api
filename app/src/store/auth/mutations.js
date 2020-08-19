/*
export function someMutation (state) {
}
*/

export const setCredential = (state, payload) => {
  state.credentials.token = payload.token;
  state.credentials.userInfo = payload.userInfo;
  if (payload.authenticated){
    state.credentials.authenticated = payload.authenticated;
  }
  if (payload.otp_auth){
    state.credentials.authenticated = payload.authenticated;
  }

};

export const validate = (state, token) => {
  state.credentials.otp_auth = token;
  state.credentials.authenticated = true;
}