# Node Api Server Starter

<a href="https://github.com/AtaruOhto/node-api-server-starter/blob/master/README.ja.md">日本語</a>

<!-- ## Summary

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

secret を生成して、「.envrc」にコピーします。
出力された文字列、下記の「export SECRET_KEY_BASE=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx」の部分を 「.envrc」に追記します。

```shell
yarn run secret

# 下記出力を .envrc に追記します。
# export SECRET_KEY_BASE=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

デフォルトでユーザー名は _root_ , パスワードは _pass_ , ホストは _localhost_ ポート番号は _3306 番ポート_ に設定しています。変更する場合には _.envrc_ を編集してください。_DB_USER_, _DB_PASS_, _DB_PORT_, _DB_HOST_ を環境に従って編集します。direnv を使わない場合には OS の環境変数に設定してください。

```shell
export DB_USER='root'
export DB_PASS='pass'
export DB_HOST='127.0.0.1'
export DB_PORT=3306
```

データベースをデフォルトの _MySQL_ から変更するには _src/config/dsatabase.ts_ の*dialect*を編集します。

```typescript
export const DB_CONFIG = {
  ...
  dialect: 'mysql',
  ...
};
```

環境変数を編集して、データベースに接続できるように _.envrc_ を編集したら、下記のコマンドを打って環境変数をロードします。

```shell
direnv allow
```

次にデータベースを作成、マイグレーションを行い、シードを流し込みます。

```shell
yarn run db:create
yarn run db:migrate
yarn run db:seed
```

サーバーを起動します。デフォルトでは _3000 番ポート_ で起動します。

```shell
yarn start
```

curl コマンドでアプリに向けて、JWT トークンを発行するようにリクエストします。返ってきた値が API を叩くために必要になる秘密のトークンです。

```shell
curl -X POST http://localhost:3000/sessions  --data 'name=Erich&password=password'
```

下記のようなデータが返ってきます。data の部分 (jwt トークン) はそれぞれ異なった値が返ってきます。

```shell
{
	"data":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoIjp7Im5hbWUiOiJFcmljaCJ9LCJpYXQiOjE1MzUyMDUzMDIsImV4cCI6MTUzNTI5MTcwMn0.DRCHA1qRwrmpBscw_ZFAde6tBPJEb7IiCso9-mXG2Gk",
	"status":200
}
```

認証が求められるユーザー一覧取得の API を叩いてみます。
「Bearer の後、半角スペースを一つ空けて」実際に返ってきた*data* の部分の JWT トークンをサーバー側に送ります。

```shell
curl -X GET http://localhost:3000/users -H "X-Auth-Token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoIjp7Im5hbWUiOiJFcmljaCJ9LCJpYXQiOjE1MzUyMDUzMDIsImV4cCI6MTUzNTI5MTcwMn0.DRCHA1qRwrmpBscw_ZFAde6tBPJEb7IiCso9-mXG2Gk"
```

シードで流したユーザー一覧が取得できます。

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

間違ったトークンや不正なリクエストを送ると下記のようなレスポンスが返ってきます。試しにトークンから一文字削除して、誤ったトークンの値を送ってみます。ステータスが 400 のレスポンスが返ってきます。

```shell
{
	"data":{},
	"status":400
}
```

下記のコマンドでテストが走ります。テストファイルはテスト対象のファイルと同じディレクトリに格納する形式をとっています。

```shell
# テストを実行する前にデータベース、テーブル等を作成
yarn run db:create:test
yarn run db:migrate:test
yarn run db:seed:test
```

```shell
yarn run test
```

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
