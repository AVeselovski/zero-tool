export interface ITask {
  _id: string;
  _groupId: string;
  title: string;
  body: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface IGroup {
  _id: string;
  title: string;
  tasks: ITask[];
  position?: number;
}
