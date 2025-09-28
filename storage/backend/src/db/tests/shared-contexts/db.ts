import { DbClient } from "@/db/modules/types";
import {
  DeleteQueryBuilder,
  InsertQueryBuilder,
  SelectQueryBuilder,
  UpdateQueryBuilder,
} from "kysely";

type MockDbKeys = Extract<
  keyof DbClient,
  "selectFrom" | "insertInto" | "deleteFrom" | "updateTable" | "transaction"
>;
type MockSelectQueryKeys = Extract<
  keyof SelectQueryBuilder<any, any, any>,
  "where" | "having" | "distinct" | "selectAll" | "select" | "executeTakeFirst" | "execute"
>;
type MockUpdateQueryKeys = Extract<
  keyof UpdateQueryBuilder<any, any, any, any>,
  "set" | "where" | "returningAll" | "returning" | "executeTakeFirst" | "execute"
>;
type MockInsertQueryKeys = Extract<
  keyof InsertQueryBuilder<any, any, any>,
  "values" | "returning" | "returningAll" | "execute" | "executeTakeFirst"
>;
type MockDeleteQueryKeys = Extract<
  keyof DeleteQueryBuilder<any, any, any>,
  "where" | "returningAll" | "returning" | "executeTakeFirst" | "execute"
>;

interface MockDbProps extends Record<MockDbKeys, jest.Mock> {}
interface MockSelectQueryProps extends Record<MockSelectQueryKeys, jest.Mock> {}
interface MockUpdateQueryProps extends Record<MockUpdateQueryKeys, jest.Mock> {}
interface MockInsertQueryProps extends Record<MockInsertQueryKeys, jest.Mock> {}
interface MockDeleteQueryProps extends Record<MockDeleteQueryKeys, jest.Mock> {}

export class MockSelectQuery implements MockSelectQueryProps {
  where = jest.fn();
  having = jest.fn();
  distinct = jest.fn();
  selectAll = jest.fn();
  select = jest.fn();
  executeTakeFirst = jest.fn();
  execute = jest.fn();

  constructor(props?: Partial<MockSelectQueryProps>) {
    Object.assign(this, props);
  }
}

export class MockUpdateQuery implements MockUpdateQueryProps {
  where = jest.fn().mockReturnThis();
  set = jest.fn().mockReturnThis();
  returningAll = jest.fn().mockReturnThis();
  returning = jest.fn().mockReturnThis();
  executeTakeFirst = jest.fn();
  execute = jest.fn();

  constructor(props?: Partial<MockUpdateQueryProps>) {
    Object.assign(this, props);
  }
}

export class MockInsertQuery implements MockInsertQueryProps {
  values = jest.fn().mockReturnThis();
  returning = jest.fn().mockReturnThis();
  returningAll = jest.fn().mockReturnThis();
  execute = jest.fn();
  executeTakeFirst = jest.fn();

  constructor(props?: Partial<MockInsertQueryProps>) {
    Object.assign(this, props);
  }
}

export class MockDeleteQuery implements MockDeleteQueryProps {
  where = jest.fn().mockReturnThis();
  returningAll = jest.fn().mockReturnThis();
  returning = jest.fn().mockReturnThis();
  executeTakeFirst = jest.fn();
  execute = jest.fn();

  constructor(props?: Partial<MockDeleteQueryProps>) {
    Object.assign(this, props);
  }
}

export class MockDbClient implements MockDbProps {
  selectFrom = jest.fn().mockReturnValue(new MockSelectQuery()) as jest.Mock<
    MockSelectQuery,
    any,
    any
  >;
  insertInto = jest.fn().mockReturnValue(new MockInsertQuery()) as jest.Mock<
    MockInsertQuery,
    any,
    any
  >;
  deleteFrom = jest.fn().mockReturnValue(new MockDeleteQuery()) as jest.Mock<
    MockDeleteQuery,
    any,
    any
  >;
  updateTable = jest.fn().mockReturnValue(new MockUpdateQuery()) as jest.Mock<
    MockUpdateQuery,
    any,
    any
  >;
  transaction = jest.fn().mockImplementation(async (fn: () => Promise<void>) => {
    await fn();
  });

  constructor(props?: Partial<MockDbProps>) {
    Object.assign(this, props);
  }

  mockSelectQueryOnce(props: Partial<MockSelectQuery>) {
    this.selectFrom.mockReturnValueOnce(new MockSelectQuery(props));
    return this;
  }

  mockUpdateQueryOnce(props: Partial<MockUpdateQuery>) {
    this.updateTable.mockReturnValueOnce(new MockUpdateQuery(props));
    return this;
  }

  mockInsertQueryOnce(props: Partial<MockInsertQuery>) {
    this.insertInto.mockReturnValueOnce(new MockInsertQuery(props));
    return this;
  }

  mockDeleteQueryOnce(props: Partial<MockDeleteQuery>) {
    this.deleteFrom.mockReturnValueOnce(new MockDeleteQuery(props));
    return this;
  }
}
