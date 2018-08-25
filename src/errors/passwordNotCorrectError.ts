export class PasswordNotCorrectError extends Error {
  public name = 'PasswordNotCorrectError';

  constructor(public message: string = 'password not correct') {
    super(message);
  }
}
