import { DbCold } from "@/db/modules/database.provider";
import { isRawNode, isValueNode } from "@/db/types/guards";
import { ok } from "node:assert";
import { LikeClause } from "../like-clause.helper";

describe(LikeClause.name, () => {
  it("should define format %...% for contain type", () => {
    const clause = new LikeClause("contain", "abc").toSql();
    const sql = clause.compile(DbCold);
    expect(sql.sql).toEqual('%$1% ESCAPE "\\"');
  });

  it("should define format ...% for startWidth type", () => {
    const clause = new LikeClause("startWidth", "abc").toSql();
    const sql = clause.compile(DbCold);
    expect(sql.sql).toEqual('$1% ESCAPE "\\"');
  });

  it("should define format %... for endWidth type", () => {
    const clause = new LikeClause("endWidth", "abc").toSql();
    const sql = clause.compile(DbCold);
    expect(sql.sql).toEqual('%$1 ESCAPE "\\"');
  });

  it("should escape % in input string", () => {
    const clause = new LikeClause("contain", "abc%abc").toSql();
    const sql = clause.compile(DbCold);
    const query = sql.query;
    ok(isRawNode(query));
    const params = query.parameters[0];
    ok(isValueNode(params));
    expect(params.value).toEqual("abc\\%abc");
  });

  it("should escape _ in input string", () => {
    const clause = new LikeClause("contain", "abc_abc").toSql();
    const sql = clause.compile(DbCold);
    const query = sql.query;
    ok(isRawNode(query));
    const params = query.parameters[0];
    ok(isValueNode(params));
    expect(params.value).toEqual("abc\\_abc");
  });
});
