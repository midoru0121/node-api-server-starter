export class ParamsValidationError extends Error {
  public name = 'ParamsValidationError';

  constructor(public message: string = 'params are missing') {
    super(message);
  }
}
