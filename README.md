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
    <li><a href="#how_to_work">Getting Started</a></li>
    <li><a href="#how_to_develop">How to develop</a></li>
  </ul>
</nav>

<h2 id="architecture">Architecture</h2>

- 100% TypeScript.
- Auth with JWT.
- Written with functions. Class are rarely used in the app.
- Spec files are located within the directory in which the test target file is.
- Written with Promise and Async Await.

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

<h2 id="how_to_develop">How to Develop</h2>

Let's create a new Model and write a controller to handle user request and learn how to develop.

Let's run these commands in another Terminal tab.

```shell
# Install npm modules
yarn

# TypeScript Watch Build
yarn run watch

# Auto Restart Node Server with source code change detection.
yarn run dev
```

TypeScript compilation errors will be notified in Terminal.

### Add New Model

Create _src/models/framework/index.ts_ .

The way of defining Model depends on <a href="http://docs.sequelizejs.com/" target="_blank">sequelize</a>.

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

### Add Migration File

Create _src/scripts/migrations/createFrameworks.ts_ .
This template doesn't use <a href="https://github.com/sequelize/cli">sequelize/cli</a>. preferring to more flexible scripts.

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

Define call of the script in _src/scripts/migrations.ts_ .

```
/* src/scripts/migrations.ts */

/* Add the line */
import { createFrameworkMigrate } from './migrations/createFrameworks';

(async () => {
  ...
  /* Add the line */
  await createFrameworkMigrate();
  ...

  sequelizeInstance.close();
})();
```

### Add Seed Data

Create _src/scripts/seeds/frameworks.ts_ put seed data into frameworks table.

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

Define call of the script above in the _src/scripts/seeds.ts_.

```typescript
/* src/scripts/seeds.ts */

/* Add the line */
import { seedFrameworks } from './seeds/frameworks';

(async () => {
  ...

  /* Add the line */
  await seedFrameworks();

  sequelizeInstance.close();
})();
```

### Execute Migration And Put Seed Data

Creating database and migrations and putting seed can be done with executing the following commands.

```shell
yarn run  db:create
yarn run  db:migrate
yarn run  db:seed
```

### Testing Model

Create _src/spec/factories/frameworkFactory.ts_ .

This template adopts <a href="https://mochajs.org/">Mocha</a> as test framework and <a href="https://github.com/power-assert-js/power-assert">power-assert</a> as a assertion library.

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

Then write _src/models/framework/spec.ts_ . We put a spec file into the directory in which the test target is.

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

And testing can be done with the commands below.

```shell
yarn run db:create:test
yarn run db:migrate:test
yarn run db:seed:test
yarn run test
```

We check the Framework Model can be created successfully and exception are thrown when invalid Framework is tried to be created.

### Add Action to Controller

Let's define the action with which a user can fetch all frameworks.

Create _src/controllers/api/v1/frameworks.ts_.

We follow routing conventions of Ruby on Rails.

The table below is cited from <cite>https://guides.rubyonrails.org/routing.html</cite>

<table class="responsive">
<thead>
<tr>
<th>HTTP Verb</th>
<th>Path</th>
<th>Controller#Action</th>
<th>Used for</th>
</tr>
</thead>
<tbody>
<tr>
<td>GET</td>
<td>/photos</td>
<td>photos#index</td>
<td>display a list of all photos</td>
</tr>
<tr>
<td>GET</td>
<td>/photos/new</td>
<td>photos#new</td>
<td>return an HTML form for creating a new photo</td>
</tr>
<tr>
<td>POST</td>
<td>/photos</td>
<td>photos#create</td>
<td>create a new photo</td>
</tr>
<tr>
<td>GET</td>
<td>/photos/:id</td>
<td>photos#show</td>
<td>display a specific photo</td>
</tr>
<tr>
<td>GET</td>
<td>/photos/:id/edit</td>
<td>photos#edit</td>
<td>return an HTML form for editing a photo</td>
</tr>
<tr>
<td>PATCH/PUT</td>
<td>/photos/:id</td>
<td>photos#update</td>
<td>update a specific photo</td>
</tr>
<tr>
<td>DELETE</td>
<td>/photos/:id</td>
<td>photos#destroy</td>
<td>delete a specific photo</td>
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

### Add new routing definition

Add a new path to _src/config/path.ts_ . All paths referenced in the application should be defined in this file.

```typescript
/* src/config/path.ts */

export const path = {
  ...
  /* Add the line */
  frameworks: '/frameworks/'
};
```

Add a route definition to the _defineRoutes()_ function in _config/routes.ts_.
All routes in the app should be defined in this file.

```typescript
import { frameworksIndex } from 'controllers/api/v1/frameworks';

export const defineRoutes = (app: Express) => {
  ...
  /* Add the line */
  app.get(path.frameworks, frameworksIndex);
  ...
};
```

If you want to show the contents only to authenticated users, apply requireAuth() middleware function before frameworksIndex handler.

### Give it a try

Let's consume the defined route with curl command.

```shell
  curl -X GET http://localhost:3000/frameworks
```

Then, frameworks data will be returned which was put by seed as following.

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

### Writing Controller Spec

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

Testing can be done with the following command.

```shell
yarn run test
```
