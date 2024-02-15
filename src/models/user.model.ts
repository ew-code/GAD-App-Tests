export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginUser {
  userEmail: string;
  userPassword: string;
}
