export type UserType = {
  id: number;
  avatar: string;
  name: string;
  email: string;
};

export interface UserInfoType {
  id: number;
  name: string;
  email: string;
  status: boolean;
  roles: { id: string; authority: string }[];
}

export interface UserRegisterType {
  name: string;
  email: string;
  password: string;
  status: boolean;
  roles: { id: number }[];
}
