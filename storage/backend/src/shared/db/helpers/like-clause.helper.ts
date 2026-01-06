import { sql } from "kysely";

export class LikeClause {
  constructor(
    private type: "contain" | "startWidth" | "endWidth",
    private str: string,
  ) {}

  toSql() {
    let escapedStr = this.escape();

    switch (this.type) {
      case "contain":
        escapedStr = `%${escapedStr}%`;
        break;
      case "startWidth":
        escapedStr = `${escapedStr}%`;
        break;
      case "endWidth":
        escapedStr = `%${escapedStr}`;
        break;
    }

    const s = sql<string>`${escapedStr}`;
    return s;
  }

  private escape() {
    return this.str.replace(/[%_]/g, "\\$&");
  }
}
