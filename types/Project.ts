import { IUser } from "./User";

export interface IProject {
  id: number | null;
  name: string;
  description?: string;
  ownerId: number | null;
  lists: IList[];
  users: IUser[];
  version?: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface IList {
  id: number;
  boardId: number;
  name: string;
  position: number;
  cards: ICard[];
}
export interface ICard {
  id: number;
  listId: number;
  name: string;
  body?: string;
  position: number;
  list: IList;
  updatedAt?: string;
  createdAt?: string;
}
