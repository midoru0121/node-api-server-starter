import { genHash } from 'helpers/bcrypt';
import { User } from 'models/user';

export const TEST_USER_NAME = 'test';
export const TEST_USER_PASS = 'password';

export const destroyTestUser = () =>
  new Promise(async resolve => {
    await User.destroy({
      where: {
        name: TEST_USER_NAME,
      },
    });
    resolve();
  });

export const findOrCreateTestUser = (otherAttrs: any) =>
  new Promise(async resolve => {
    const encryptedPassword = await genHash(TEST_USER_PASS);
    otherAttrs.password = encryptedPassword as string;
    const instance = await User.findOrCreate({
      where: {
        name: TEST_USER_NAME,
      },
      defaults: otherAttrs,
    });
    resolve(instance);
  });

// /* 任意のユーザーを削除 */
// export const destroyUserByName = (name: string) =>
//   new Promise(async resolve => {
//     await UserModel.destroy({
//       where: {
//         name,
//       },
//     });
//     resolve();
//   });

// /* 任意のユーザーを作成 */
// export const findOrCreateUserByName = (name: string, otherAttrs: IOtherAttrs) =>
//   new Promise(async resolve => {
//     const encryptedPassword = await genHash(otherAttrs.password);
//     otherAttrs.password = encryptedPassword as string;
//     const instance = await UserModel.findOrCreate({
//       where: {
//         name,
//       },
//       defaults: otherAttrs,
//     });
//     resolve(instance);
//   });

// /* 任意の単一ユーザーを検索 */
// export const findOneUserByName = (name: string) =>
//   new Promise(async resolve => {
//     const instance = await UserModel.findOne({
//       where: {
//         name,
//       },
//     });
//     resolve(instance as any);
//   });

// /* 認証用のJWTトークンを生成する */
// export const getJwtToken = (value: IJwtTokenValue) => generateToken(value);

// /* 認証用のJWTトークンを生成する: typeがmasterのJWTトークンを生成 */
// export const getMasterJwtToken = () =>
//   generateToken({
//     name: process.env.MASTER_USER,
//     pass: process.env.MASTER_PASS,
//     type: 'master',
//   });
