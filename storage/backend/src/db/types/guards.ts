import { BinaryOperationNode, OperationNode, OperatorNode, RawNode, ValueNode } from "kysely";

export function isBinaryOperationNode(node: OperationNode): node is BinaryOperationNode {
  return node.kind == "BinaryOperationNode";
}

export function isValueNode(node: OperationNode): node is ValueNode {
  return node.kind == "ValueNode";
}

export function isRawNode(node: OperationNode): node is RawNode {
  return node.kind == "RawNode";
}

export function isOperatorNode(node: OperationNode): node is OperatorNode {
  return node.kind == "OperatorNode";
}
