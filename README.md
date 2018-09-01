# Node Api Server Starter

- <a href="https://github.com/AtaruOhto/node-api-server-starter/blob/master/README.ja.md">日本語</a>

## Prerequisite

- direnv (https://direnv.net/)
- MySQL

## Environment Variables

```
cp .envrc.sample .envrc
direnv allow
```

## Database

Default database are set to MySQL and the dialect can be changed by editing _src/config/database.ts_ .

### Create

```
yarn run db:create
```

```
yarn run db:migrate
```

```
yarn run db:seed
```

## Start

build TypeScript.

```
yarn run watch
```

Start the server at 3000 port.

```
yarn run dev
```

## Directories

- scripts

  - Any scripts which can be called via yarn command should be located.
    - migrations
    - seeds
    - create db tasks

- middlewares

  - Node.js middleware, such as the functions which checks user's session should be located.

- controllers

  - All Node.js (Express) handler should be located.

- helpers

  - Helper functions used in all over the app should be located.

- config
  - All configurations such as database, routing, port number should be located.
