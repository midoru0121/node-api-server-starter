export class ResourceNotFoundError extends Error {
  public name = 'ResourceNotFoundError';

  constructor(public message: string = 'resource not found') {
    super(message);
  }
}
