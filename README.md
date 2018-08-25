# Node Api Server Starter

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
yarn run build
```

Start the server at 3000 port.

```
yarn start
```

## Directories

- scripts
  Any scripts which can be called via yarn command should be located.

  - migrations
  - seeds
  - create db tasks

- middlewares
  Node.js middleware, such as the functions which checks user's session should be located.

- controllers
  All Node.js (Express) handler should be located.

- helpers
  Helper functions used in all over the app should be located.

- config
  All configuration such as database, routing, port number should be located.
