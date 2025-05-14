# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)


## Stack
- ExpressJS
  - Prisma for ORM
- Postgres
- Tauri (Rust + React)

## Rest API
The rest api is contained in `src-restapi` and configures all of the endpoints for the application. Database models are also defined here.

The rest api functions as a completely silo'd application and has it's own confiuration, testing, deployment, etc.

For more details, see the [rest api readme](./src-restapi/README.md)

### ORM 
The definition for our database is in [this file](./src-restapi/prisma/schema.prisma). Once you've achieved your desired schema, the workflow is as follows...

```bash
npx prisma generate

npm prisma migrate dev
```