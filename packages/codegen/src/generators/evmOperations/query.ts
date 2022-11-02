import { tsquery } from '@phenomnomnominal/tsquery';
import { Node } from 'ts-morph';
import ts from 'typescript';

export function query<Type extends Node = Node>(node: Node, q: string): Type[] {
  return tsquery(node.compilerNode as ts.Node, q).map((n) => (node as any)._getNodeFromCompilerNode(n) as Type);
}
