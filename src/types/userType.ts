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
  first_acess: boolean;
  photo: string | null;
  roles: number[];
}

export interface UserRegisterType {
  name: string;
  email: string;
  password: string;
  status: boolean;
  first_acess: boolean;
  photo: File | null;
  roles: number[];
}
