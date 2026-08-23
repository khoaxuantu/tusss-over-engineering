---
name: code-snippets
description: Defines correct conventions for code snippets of the project, for instance, modules, injectable classes, cqrs patterns, jest suites etc. Refers to snippets in this skill to generate blocks of code that follow correct conventions
---

# Code Conventions & Snippets

This skill defines the canonical templates for every kind of file in this NestJS / CQRS codebase.
Always generate code that matches these patterns exactly.

---

## 1. NestJS Module (`*.module.ts`)

**File naming:** `<name>.module.ts` inside the domain folder root.
**Exception:** Only `app.module.mts`, `adminPanel.module.mts`, and `admin.module.mts` use the `.mts` extension and require `.js` imports (ESM interop). All other modules use plain `.ts`.
CQRS handlers are usually grouped into a dedicated `<name>.command.module.ts` / `<name>.query.module.ts` imported by the domain module.

```typescript
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class ModuleName {}
```

---

## 2. NestJS Injectable (`*.service.ts`, `*.repository.ts`, etc.)

**File naming:** `<name>.service.ts`, `<name>.repository.ts`, etc. (never `*.module.ts` or `*.spec.ts`).
Use `Logger` with the class name when logging is needed.

```typescript
import { Injectable } from "@nestjs/common";

@Injectable()
export class ClassName {
  constructor() {}
}
```

---

## 3. NestJS Controller (`*.controller.ts`)

**File naming:** `<name>.controller.ts`; versioned variants use `<name>.v1.controller.ts`.
**Directory:** `controllers/` subdirectory inside the domain.
Controllers are **thin** — they inject `CommandBus` / `QueryBus` and dispatch CQRS objects; they do not contain business logic.
Always add Swagger decorators (`@ApiTags`, `@ApiOperation`, `@ApiResponse`).

```typescript
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("route")
@ApiTags("apiTag")
export class ClassName {
  constructor() {}
}
```

---

## 4. CQRS Command (`*.command.ts`)

**File naming:** `<name>.command.ts`.
**Directory:** `commands/` subdirectory inside the domain.
The command class **and** its handler are co-located in the **same file**.
The handler method is **`execute`**.

```typescript
import { Command, ICommandHandler, CommandHandler } from "@nestjs/cqrs";

export class CommandName extends Command<void> {
  constructor() {
    super();
  }
}

@CommandHandler(CommandName)
export class CommandNameHandler implements ICommandHandler<CommandName> {
  constructor() {}

  async execute(command: CommandName) {}
}
```

---

## 5. CQRS Query (`*.query.ts`)

**File naming:** `<name>.query.ts`.
**Directory:** `queries/` subdirectory inside the domain (repository queries live in `repositories/queries/`).
The query class **and** its handler are co-located in the **same file**.
The handler method is **`execute`**.

```typescript
import { Query, IQueryHandler, QueryHandler } from "@nestjs/cqrs";

export class QueryName extends Query<void> {
  constructor() {
    super();
  }
}

@QueryHandler(QueryName)
export class QueryNameHandler implements IQueryHandler<QueryName> {
  constructor() {}

  async execute(query: QueryName) {}
}
```

---

## 6. CQRS Event (`*.event.ts`)

**File naming:** `<name>.event.ts`.
**Directory:** `events/` subdirectory inside the domain.
The event class is a **plain class** (no base class extension).
The event class **and** its handler are co-located in the **same file**.
The handler method is **`handle`** (not `execute`).

```typescript
import { IEventHandler, EventsHandler } from "@nestjs/cqrs";

export class EventName {
  constructor() {}
}

@EventsHandler(EventName)
export class EventNameHandler implements IEventHandler<EventName> {
  constructor() {}

  async handle(event: EventName) {}
}
```

---

## 7. Jest Test Suite (`*.spec.ts`)

**File naming:** `<name>.spec.ts`.
**Directory:** `tests/` subdirectory next to the source file being tested.
Key conventions:

- `describe(ClassName.name, ...)` — use `.name` property for the top-level describe label.
- Use `beforeAll` (not `beforeEach`) when one shared module instance covers all tests.
- Inject mocks via `{ provide: Token, useValue: mockObject }`.
- Mock factory functions (e.g. `mockSomeService()`) are imported from a sibling `mocks/` directory.

```typescript
import { Test, TestingModule } from "@nestjs/testing";

describe(ClassName.name, () => {
  let instance: ClassName;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ClassName],
    }).compile();

    instance = module.get(ClassName);
  });
});
```

---

## Summary: file-type to template mapping

| File pattern                            | Template to use   |
| --------------------------------------- | ----------------- |
| `*.module.ts`                           | NestJS Module     |
| `*.service.ts`, `*.repository.ts`, etc. | NestJS Injectable |
| `*.controller.ts`                       | NestJS Controller |
| `*.command.ts` (or in `commands/`)      | CQRS Command      |
| `*.query.ts` (or in `queries/`)         | CQRS Query        |
| `*.event.ts` (or in `events/`)          | CQRS Event        |
| `*.spec.ts`                             | Jest Test Suite   |
