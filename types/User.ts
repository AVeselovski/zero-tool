import { IProject } from "./Project";

export interface IAuthUser {
  name: string;
  email: string;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  boards: IProject[];
}
