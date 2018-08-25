import bcrypt = require('bcrypt');

export const comparePlainWithHash = (
  plainText: string,
  encrypted: string,
): Promise<boolean> =>
  new Promise((resolve, reject) => {
    bcrypt.compare(plainText, encrypted, (error: any, isEqual: boolean) => {
      error ? reject(error) : resolve(isEqual);
    });
  });

export const genHash = (
  plainText: string,
  saltRounds: number = 10,
): Promise<string> =>
  new Promise((resolve, reject) => {
    bcrypt.hash(plainText, saltRounds, (hashError: any, encrypted: string) => {
      return hashError ? reject(hashError) : resolve(encrypted);
    });
  });

export const genHashSync = (plainText: string, saltRounds: number = 10) =>
  bcrypt.hashSync(plainText, saltRounds);
