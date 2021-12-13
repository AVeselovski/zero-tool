export interface IRequestOptions {
  method: string;
  headers: { [key: string]: string };
  body: undefined | string;
}
