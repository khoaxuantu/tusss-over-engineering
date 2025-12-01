# Tusss Storage Backend

This is my backend server for my storage app.

## Getting started

### Installing dependencies

```bash
pnpm install
```

### Migration

Creating migrations without applying it

```bash
pnpm prisma migrate dev --create-only
```

Applying migrations

```bash
pnpm prisma migrate dev
```

Generate schemas

```bash
pnpm prisma generate
```

Format prisma schema files

```bash
pnpm prisma format
```

Nuke

```bash
pnpm prisma migrate reset
```

### Seeding

Using Bun to run seeding scripts.

```bash
bun run ./scripts/seeds/path/to/a/script.ts
```

### Running app

```bash
bun run start:dev
```

### Running test

```bash
bun run test
```

Coverage

```bash
bun run test:cov
```

## Learn More

### NestJS

- https://docs.nestjs.com/

### Kysely & Prisma-Kysely

- [Kysely](https://kysely.dev/)
- [prisma-kysely](https://github.com/valtyr/prisma-kysely)

### Prisma

- [CLI](https://www.prisma.io/docs/orm/reference/prisma-cli-reference)
- [Schema](https://www.prisma.io/docs/orm/prisma-schema)
- [Migrations](https://www.prisma.io/docs/orm/prisma-migrate)

### PostgreSQL

- https://www.postgresql.org/docs
