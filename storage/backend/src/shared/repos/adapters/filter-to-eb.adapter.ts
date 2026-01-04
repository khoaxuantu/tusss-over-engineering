import { LikeClause } from "@/shared/db/helpers/like-clause.helper";
import { Db } from "@/shared/db/modules/types";
import { FilterString } from "@/shared/models/filter.model";
import { Expression, expressionBuilder, SqlBool } from "kysely";

export class FilterToEbAdapter {
  static forString(field: Expression<string>, filter: FilterString) {
    const eb = expressionBuilder<Db>();
    const filters: Expression<SqlBool>[] = [];

    if (filter.contain)
      filters.push(eb(field, "like", new LikeClause("contain", filter.contain).toSql()));
    if (filter.eq) filters.push(eb(field, "=", eb.val(filter.eq)));
    if (filter.ne) filters.push(eb(field, "!=", eb.val(filter.ne)));
    if (filter.in) filters.push(eb(field, "in", filter.in));
    if (filter.nin) filters.push(eb(field, "not in", filter.nin));

    return eb.and(filters);
  }
}
