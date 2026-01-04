import { BinaryOperationNode, OperationNode, OperatorNode } from "kysely";

export function isBinaryOperationNode(node: OperationNode): node is BinaryOperationNode {
  return node.kind == "BinaryOperationNode";
}

export function isOperatorNode(node: OperationNode): node is OperatorNode {
  return node.kind == "OperatorNode";
}
