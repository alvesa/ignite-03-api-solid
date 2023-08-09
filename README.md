## Prisma

- Initialization of prisma schema
`prisma init`

- Generation of prisma schema as typescript data model
`prisma generate`

- Generating migration `npx prisma migrate dev`

- Studio `npx prisma studio`

## Docker

- Creating docker image manually `docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRES_PASSWORD=<pass> -e POSTGRES_DATABASE=apisolid -p 5432:5432 bitnami/postgresql`

- PG starting `docker compose up -d`
