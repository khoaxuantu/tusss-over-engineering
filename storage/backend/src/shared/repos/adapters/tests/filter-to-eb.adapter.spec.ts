import { MockExpression } from "@/shared/db/tests/shared-contexts/expression";
import { isBinaryOperationNode, isOperatorNode } from "@/shared/db/types/guards";
import assert from "node:assert";
import { FilterToEbAdapter } from "../filter-to-eb.adapter";

describe(FilterToEbAdapter.name, () => {
  describe("forString", () => {
    const exp = new MockExpression("string");

    test("contain", () => {
      const filter = FilterToEbAdapter.forString(exp, { contain: "abc%sss" });
      const node = filter.toOperationNode();

      assert(isBinaryOperationNode(node));
      assert(isOperatorNode(node.operator));
      expect(node.operator.operator).toEqual("like");
    });

    test("eq", () => {
      const filter = FilterToEbAdapter.forString(exp, { eq: "abc" });
      const node = filter.toOperationNode();

      assert(isBinaryOperationNode(node));
      assert(isOperatorNode(node.operator));
      expect(node.operator.operator).toEqual("=");
    });

    test("ne", () => {
      const filter = FilterToEbAdapter.forString(exp, { ne: "abc" });
      const node = filter.toOperationNode();

      assert(isBinaryOperationNode(node));
      assert(isOperatorNode(node.operator));
      expect(node.operator.operator).toEqual("!=");
    });

    test("in", () => {
      const filter = FilterToEbAdapter.forString(exp, { in: ["abc", "def"] });
      const node = filter.toOperationNode();

      assert(isBinaryOperationNode(node));
      assert(isOperatorNode(node.operator));
      expect(node.operator.operator).toEqual("in");
    });

    test("nin", () => {
      const filter = FilterToEbAdapter.forString(exp, { nin: ["abc", "def"] });
      const node = filter.toOperationNode();

      assert(isBinaryOperationNode(node));
      assert(isOperatorNode(node.operator));
      expect(node.operator.operator).toEqual("not in");
    });
  });
});
