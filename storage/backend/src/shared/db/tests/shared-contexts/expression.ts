import { Expression, OperationNode } from "kysely";

export class MockExpression<T> implements Expression<T> {
  constructor(private type: T) {}

  get expressionType(): T {
    return this.type;
  }

  toOperationNode(): OperationNode {
    return {
      kind: "OperatorNode",
    };
  }
}
