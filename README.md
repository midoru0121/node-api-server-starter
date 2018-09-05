# Node Api Server Starter

<a href="https://github.com/AtaruOhto/node-api-server-starter/blob/master/README.ja.md">日本語</a>

## Summary

Node.js API Server template based on TypeScript.

- Language: <a href="https://www.typescriptlang.org/">TypeScript</a>
- Node: <a href="https://nodejs.org/en/">Node.js (v.8: LTS)</a>
- Routing: <a href="https://github.com/expressjs/express">Express</a>
- Auth: <a href="https://jwt.io/">JWT Authentication</a>
- ORM: <a href="https://github.com/sequelize/sequelize">sequelize</a>
- Testing: <a href="https://github.com/mochajs/mocha">Mocha</a> + <a href="https://github.com/power-assert-js/power-assert">power-assert</a>

## Prerequisite

- Node.js (Version 8 LTS)
- Yarn
- direnv
- MySQL

## Table of Contents

<nav>
  <ul>
    <li><a href="#architecture">Architecture</a></li>
    <li><a href="#how_to_work">How to work</a></li>
    <li><a href="#how_to_develop">How to develop</a></li>
  </ul>
</nav>

<h2 id="architecture">Architecture</h2>

- Written with functions. Class are hardly used in the app.
- Test files are located within the directory in which the test target file is located.
- Wrriten with Promise and Async Await,

### Directory Structure

- config : stores application settings, such as JWT token algorythm and DB settings.
- controllers : stores request handler functions.
- errors : stores errors.
- helpers : stores helper functions used everywhere in the app.
- middlewares : stores Express middlewares.
- models : stores sequelize Model such as, User, Book.
- scripts : stores scripts called from yarn command.
- spec : stores Factory Function used in spec files.

<h2 id="how_to_work">Getting Started</h2>

```shell
git clone git@github.com:AtaruOhto/node-api-server-starter.git
cd node-api-server-starter
yarn
cp .envrc.sample .envrc
```

Please generate a secret string and copy it to .envrc file.
Also you can set this as environment variable in OS if you like.

```shell
yarn run secret

# copy it to .envrc file
# export SECRET_KEY_BASE=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Default database settings is as follows:

- User: root
- Password: pass
- host: localhost
- port: 3306

You can override these settings by the editing .envrc file.

```shell
export DB_USER='root'
export DB_PASS='pass'
export DB_HOST='127.0.0.1'
export DB_PORT=3306
```

If want to use another database, please edit _dialect_ in _src/config/dsatabase.ts_.

For more details, <a href="http://docs.sequelizejs.com/manual/installation/usage.html#dialects">sequelize manual dialects</a>.

```typescript
export const DB_CONFIG = {
  ...
  dialect: 'mysql',
  ...
};
```

After editing _.envrc_ as database can be connected, type the following command and load environment variables defined in _.envrc_ .

```shell
direnv allow
```

Then, create database and migration and put seed data into tables.

```shell
yarn run db:create
yarn run db:migrate
yarn run db:seed
```

Start Node.js server. The server runs at port 3000 as default.

```shell
yarn start
```

Let's test. Request the server to issue the JWT token. The returned value is the token which will be used with authentication.

```shell
curl -X POST http://localhost:3000/sessions  --data 'name=Erich&password=password'
```

The following is an example of returned value. data will be different in each time.

```shell
{
	"data":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoIjp7Im5hbWUiOiJFcmljaCJ9LCJpYXQiOjE1MzUyMDUzMDIsImV4cCI6MTUzNTI5MTcwMn0.DRCHA1qRwrmpBscw_ZFAde6tBPJEb7IiCso9-mXG2Gk",
	"status":200
}
```

Let's consume API which requires authentication and get all users. Request the server with the string composed by Bearer and blank space and returned value as following:

```shell
curl -X GET http://localhost:3000/users -H "X-Auth-Token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoIjp7Im5hbWUiOiJFcmljaCJ9LCJpYXQiOjE1MzUyMDUzMDIsImV4cCI6MTUzNTI5MTcwMn0.DRCHA1qRwrmpBscw_ZFAde6tBPJEb7IiCso9-mXG2Gk"
```

All user put by seed can be fetched.

```shell
{
	"data":
		[
			{"id":9,"name":"Erich","password":"$2b$10$5oo2y/pqQ.NTcaQgL4DF3ODlM3DKDsyiQZgnu5seQS/vUN1lkI8ua"},
			{"id":10,"name":"Richard","password":"$2b$10$5oo2y/pqQ.NTcaQgL4DF3ODlM3DKDsyiQZgnu5seQS/vUN1lkI8ua"},
			{"id":11,"name":"Ralph","password":"$2b$10$5oo2y/pqQ.NTcaQgL4DF3ODlM3DKDsyiQZgnu5seQS/vUN1lkI8ua"},
			{"id":12,"name":"John","password":"$2b$10$5oo2y/pqQ.NTcaQgL4DF3ODlM3DKDsyiQZgnu5seQS/vUN1lkI8ua"}
		]
	,"status":200
}
```

If you send a request with wrong token or any invalid request, following response will be returned.

```shell
{
	"data":{},
	"status":400
}
```

Testing runs with the command. All spec file is located in the directory in which the test target file is stored.

```shell
# Create database and do migration, before run testing.
yarn run db:create:test
yarn run db:migrate:test
yarn run db:seed:test
```

```shell
yarn run test
```

<!--
<h2 id="how_to_develop">開発してみる</h2>

新しいモデルを追加して、それに対応するマイグレーションやコントローラーを記述することを通して
一連の開発方法例を提示します。

ターミナルで下記コマンドをそれぞれ別タブで起動します。

```shell
# npmモジュールのインストール
yarn

# TypeScriptのwatchビルド
yarn run watch

# ソースコード変更を検知してNodeサーバーを自動的に再起動
yarn run dev
```

TypeScript のコンパイルエラーがあれば、ターミナル上で通知されます。

### 新規モデルの追加

_src/models/framework/index.ts_ ファイルを追加します。

モデルは <a href="http://docs.sequelizejs.com/" target="_blank">sequelize</a>の記法に従っています。
sequelize については<a href="http://docs.sequelizejs.com/" target="_blank">sequelize</a>こちらをご覧ください。

```typescript
/* src/models/framework/index.ts */

import Sequelize from 'sequelize';

import { sequelizeInstance } from 'config/database';

export const FrameworksTable = {
  name: 'frameworks',
  schema: {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    language: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
};

export const Framework = sequelizeInstance.define(
  FrameworksTable.name,
  FrameworksTable.schema,
);
```

### マイグレーションの追加

_src/scripts/migrations/createFrameworks.ts_ を追加します。
<a href="https://github.com/sequelize/cli">sequelize/cli</a> を使う方法もあるのですが、より柔軟性の高い、スクリプトで記述することにしています。

```typescript
/* src/scripts/migrations/createFrameworks.ts */

import { Framework } from 'models/framework';

export const createFrameworkMigrate = () =>
  new Promise(async (resolve, reject) => {
    try {
      await Framework.sync();
      resolve();
    } catch (e) {
      reject(e);
    }
  });
```

_src/scripts/migrations.ts_ から呼び出しを追加します。

```
/* src/scripts/migrations.ts */

import { createFrameworkMigrate } from './migrations/createFrameworks';

(async () => {
  ...
  /* 追加 */
  await createFrameworkMigrate();
  ...

  sequelizeInstance.close();
})();
```

### シードデータの追加

_src/scripts/seeds/frameworks.ts_ にシードデータの追加処理を記述します。

```typescript
/* src/scripts/seeds/frameworks.ts */

import { Framework } from 'models/framework';

export const seedFrameworks = () =>
  new Promise(async (resolve, reject) => {
    await Framework.bulkCreate([
      {
        name: 'Express',
        language: 'JavaScript',
      },
      {
        name: 'Ruby on Rails',
        language: 'Ruby',
      },
      {
        name: 'Django',
        language: 'Python',
      },
      {
        name: 'Laravel',
        language: 'PHP',
      },
    ]).catch(e => {
      /* Errorを出力する。 */
      console.log(e);
    });
    resolve();
  });
```

上記で実装した追加処理の呼び出しを記述します。

```typescript
/* src/scripts/seeds.ts */

import { seedFrameworks } from './seeds/frameworks';

(async () => {
  ...
  await seedFrameworks();
  sequelizeInstance.close();
})();
```

### マイグレーション & シードデータの流し込み

下記コマンドを打って、データベースを作成、マイグレーション、シードデータを流し込みます。

```shell
yarn run  db:create
yarn run  db:migrate
yarn run  db:seed
```

### モデルのテスト

_src/spec/factories/frameworkFactory.ts_ を作成します。

テストフレームワークは<a href="https://mochajs.org/">Mocha</a>, アサーションライブラリーとして<a href="https://github.com/power-assert-js/power-assert">power-assert</a>を使っています。

```typescript
/* src/spec/factories/frameworkFactory.ts */

import { Framework } from 'models/framework';

export const TEST_FRAMEWORK = 'GreatFramework';
export const TEST_LANGUAGE = 'whiteSpace';

export const destroyTestFramework = () =>
  new Promise(async resolve => {
    await Framework.destroy({
      where: {
        name: TEST_FRAMEWORK,
      },
    });
    resolve();
  });

export const findOrCreateTestFramework = (otherAttrs: any) =>
  new Promise(async resolve => {
    const instance = await Framework.findOrCreate({
      where: {
        name: TEST_FRAMEWORK,
        language: TEST_LANGUAGE,
      },
      defaults: otherAttrs,
    });
    resolve(instance);
  });
```

モデルのテストを記述します。

_src/models/framework/spec.ts_ を記述します。

- テストファイルはテスト対象のファイルと同じディレクトリに配置します。

```typescript
import { Framework } from 'models/framework';
import assert from 'power-assert';
import {
  destroyTestFramework,
  findOrCreateTestFramework,
  TEST_FRAMEWORK,
} from 'spec/factories/frameworkFactory';

describe('Framework', () => {
  describe('Positive', () => {
    beforeEach(() =>
      new Promise(async resolve => {
        await findOrCreateTestFramework({});
        resolve();
      }));

    afterEach(() =>
      new Promise(async resolve => {
        await destroyTestFramework();
        resolve();
      }));

    it('success', () =>
      new Promise(async (resolve, reject) => {
        const framework = (await Framework.findOne({
          where: { name: TEST_FRAMEWORK },
        })) as any;
        assert.equal(framework.name, TEST_FRAMEWORK);
        resolve();
      }));
  });

  describe('Negative', () => {
    it('fail without language', () =>
      new Promise(async (resolve, reject) => {
        try {
          await Framework.create({
            name: 'foobarFramework',
          });
        } catch (e) {
          resolve();
        }
      }));
  });
});
```

テストを走らせてみます。

```shell
yarn run db:create:test
yarn run db:migrate:test
yarn run db:seed:test
yarn run test
```

正常に Framework モデルが作成できることと、NOTNULL 制約がかかっている \_language\* を欠いた Frmework モデルを create しようとすると例外が起きることをチェックしています。

### コントローラーへのアクションの追加

framework をすべて取得するアクション (frameworksIndex) を定義します。 _/ src/controllers/api/v1/frameworks.ts /_ を追加します。
ルーティングの命名や形式は Rails に従っています。

引用元 <cite>https://railsguides.jp/routing.html</cite>

<table>
  <thead>
    <tr>
      <th>HTTP動詞</th>
      <th>パス</th>
      <th>コントローラ#アクション</th>
      <th>目的</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td>/photos</td>
      <td>photos#index</td>
      <td>すべての写真の一覧を表示</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/photos/new</td>
      <td>photos#new</td>
      <td>写真を1つ作成するためのHTMLフォームを返す</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/photos</td>
      <td>photos#create</td>
      <td>写真を1つ作成する</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/photos/:id</td>
      <td>photos#show</td>
      <td>特定の写真を表示する</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/photos/:id/edit</td>
      <td>photos#edit</td>
      <td>写真編集用のHTMLフォームを1つ返す</td>
    </tr>
    <tr>
      <td>PATCH/PUT</td>
      <td>/photos/:id</td>
      <td>photos#update</td>
      <td>特定の写真を更新する</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/photos/:id</td>
      <td>photos#destroy</td>
      <td>特定の写真を削除する</td>
    </tr>
  </tbody>
</table>

```typescript
import { Request, Response } from 'express';

import { respondWith } from 'helpers/response';
import { Framework } from 'models/framework';

export const frameworksIndex = async (req: Request, res: Response) => {
  try {
    const frameworks = await Framework.findAll();
    respondWith(res, 200, frameworks);
  } catch (e) {
    respondWith(res, 500);
  }
};
```

### 新規ルーティングの追加

_src/config/path.ts_ にパスを追加します。
アプリケーション上で参照されるパスはすべてこのファイルに記述するようにしています。

```typescript
/* src/config/path.ts */

export const path = {
  ...
  /* 追加 */
  frameworks: '/frameworks/'
};
```

_config/routes.ts_ の*defineRoutes()* にルート定義を追加します。
アプリケーション上で参照されるルーティングとハンドラーの組み合わせはすべてこのファイルに記述するようにしています。

```typescript
import { frameworksIndex } from 'controllers/api/v1/frameworks';

export const defineRoutes = (app: Express) => {
  ...
  /* 追加 */
  app.get(path.frameworks, frameworksIndex);
  ...
};
```

認証済みのユーザーに対してしか、コンテンツを見せたくない場合には requireAuth() ミドルウェア関数を frameworksIndex の前に適用します。

### 作成したルーティングを試してみる。

それぞれ Terminal の別ウィンドウで実行します。

curl コマンド を使って定義したルーティングを叩いてみます。

```shell
  curl -X GET http://localhost:3000/frameworks
```

すると下記のようにシードで流し込んだフレームワーク一覧の JSON データが返ってきます。

```shell
{"data":
	[
		{"id":1,"name":"Express","language":"JavaScript"},
		{"id":2,"name":"Ruby on Rails","language":"Ruby"},
		{"id":3,"name":"Django","language":"Python"},
		{"id":4,"name":"Laravel","language":"PHP"}
	],"
	status":200
}
```

### コントローラーのテストを記述する

- src/controllers/api/v1/frameworks/spec.ts

```typescript
/* src/controllers/api/v1/frameworks/spec.ts */

import assert from 'power-assert';
import request from 'supertest';

import { path } from 'config/path';
import { app } from 'index';
import {
  destroyTestFramework,
  findOrCreateTestFramework,
  TEST_FRAMEWORK,
} from 'spec/factories/frameworkFactory';

describe(`Framework Controller`, () => {
  beforeEach(() =>
    new Promise(async resolve => {
      await findOrCreateTestFramework({});
      resolve();
    }));

  afterEach(() =>
    new Promise(async resolve => {
      await destroyTestFramework();
      resolve();
    }));

  describe('Create', () => {
    describe(`Positive`, () =>
      it('User will be successfully created', () =>
        new Promise(resolve => {
          request(app)
            .get(path.frameworks)
            .set('Accept', 'application/json')
            .then(async (res: any) => {
              const framework = res.body.data.filter(
                (elem: any) => elem.name === TEST_FRAMEWORK,
              );
              assert.equal(framework[0].name, TEST_FRAMEWORK);
              resolve();
            });
        })));
  });
});
```

下記コマンドでテストが走らせることができます。

```shell
yarn run test
``` -->
