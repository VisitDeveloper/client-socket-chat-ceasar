import { jwtDecode } from "jwt-decode";

export const jwtDecoder = (token) => {
  return jwtDecode(token); //// prints jwt body
};
export const getPermissionsFromToken = (
  accessToken
) => {
  if (accessToken) return jwtDecoder(accessToken)?.realm_access?.roles;
  else return [];
};

export const tokenDataDecoder = (token)  => {
    if(token){
        return jwtDecode(token)
    } 
}
