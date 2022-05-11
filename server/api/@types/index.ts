type DocumentResult<T> = {
  _doc: T;
};

export interface UserModel extends DocumentResult<UserModel> {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}
