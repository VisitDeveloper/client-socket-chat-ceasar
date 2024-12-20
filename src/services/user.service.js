import { BaseService } from "./base.service";

export class UserService extends BaseService {
  getUsers() {
    return this.axiosInstanceWithToken.get(`/users`);
  }
}
