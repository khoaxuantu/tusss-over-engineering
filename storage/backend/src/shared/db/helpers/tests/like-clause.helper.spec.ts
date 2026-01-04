import { DbCold } from "@/shared/db/modules/database.provider";
import { LikeClause } from "../like-clause.helper";

describe(LikeClause.name, () => {
  it("should define format %...% for contain type", () => {
    const clause = new LikeClause("contain", "abc").toSql();
    const sql = clause.compile(DbCold);
    expect(sql.sql).toEqual("$1");
    expect(sql.parameters.at(0)).toEqual("%abc%");
  });

  it("should define format ...% for startWidth type", () => {
    const clause = new LikeClause("startWidth", "abc").toSql();
    const sql = clause.compile(DbCold);
    expect(sql.sql).toEqual("$1");
    expect(sql.parameters.at(0)).toEqual("abc%");
  });

  it("should define format %... for endWidth type", () => {
    const clause = new LikeClause("endWidth", "abc").toSql();
    const sql = clause.compile(DbCold);
    expect(sql.sql).toEqual("$1");
    expect(sql.parameters.at(0)).toEqual("%abc");
  });

  it("should escape % in input string", () => {
    const clause = new LikeClause("contain", "abc%abc").toSql();
    const sql = clause.compile(DbCold);
    expect(sql.parameters.at(0)).toEqual("%abc\\%abc%");
  });

  it("should escape _ in input string", () => {
    const clause = new LikeClause("contain", "abc_abc").toSql();
    const sql = clause.compile(DbCold);
    expect(sql.parameters.at(0)).toEqual("%abc\\_abc%");
  });
});
