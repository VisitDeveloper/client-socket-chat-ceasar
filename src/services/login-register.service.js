import { BaseService } from "./base.service";


export class LoginService extends BaseService {
    login(payload) {
        return this.axiosInstanceWithoutToken.post(`/login`, payload);
    }
    register(payload) {
        return this.axiosInstanceWithoutToken.post(`/register`, payload);
    }
}



