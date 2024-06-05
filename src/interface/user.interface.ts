export interface IUserCreate {
  name: string;
  documentNumber: string;
  email: string;
  password: string;
}
export interface IUserUpdate {
  name: string | null;
  documentNumber: string | null;
  email: string | null;
}

export interface IUserResponse {
  name: string;
  documentNumber: string;
  email: string;
  createdAt: Date;
  active: boolean;
}
