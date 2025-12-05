import { sql } from "kysely";

export class LikeClause {
  constructor(
    private type: "contain" | "startWidth" | "endWidth",
    private str: string,
  ) {}

  toSql() {
    const escapedStr = this.escape();

    switch (this.type) {
      case "contain":
        return sql<string>`%${escapedStr}% ESCAPE "\\"`;
      case "startWidth":
        return sql<string>`${escapedStr}% ESCAPE "\\"`;
      case "endWidth":
        return sql<string>`%${escapedStr} ESCAPE "\\"`;
    }
  }

  private escape() {
    return this.str.replace(/[%_]/g, "\\$&");
  }
}
