/*
export function someMutation (state) {
}
*/

export const setCredential = (state, payload) => {
  state.credentials.token = payload.token;
  state.credentials.userInfo = payload.userInfo;
  state.credentials.authenticated = true;
};
