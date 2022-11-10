export enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
  RESET_PASSWORD = 'RESET_PASSWORD',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
}

export interface IToken {
  id: string;
  token: string;
  userId: string;
  type: TokenType;
  expires: string;
}
