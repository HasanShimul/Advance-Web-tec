import { AdminEntity } from "src/users/admin/admin.entity";

export interface UsersResponse {
    message?: string;
    data?: AdminEntity[];
  }