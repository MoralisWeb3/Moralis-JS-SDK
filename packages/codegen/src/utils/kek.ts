import ts from 'typescript';
import { readFileSync } from 'fs-extra';

const node = ts.createSourceFile(
  'x.ts',
  readFileSync('./packages/evmApi/src/generated/types.ts', 'utf8'),
  ts.ScriptTarget.Latest,
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const importDecl: ts.InterfaceDeclaration[] = [];
node.forEachChild((child) => {
  if (ts.SyntaxKind[child.kind] === 'InterfaceDeclaration') {
    importDecl.push(child as ts.InterfaceDeclaration);
  }
});

let statement: ts.InterfaceDeclaration | undefined;

node.forEachChild((child) => {
  if (ts.isInterfaceDeclaration(child) && child.name.text === 'operations') {
    statement = child;
  }
});

const kek: any[] = [];
//@ts-ignore
statement.forEachChild((child) => {
  //@ts-ignore
  if (child?.name?.text) {
    //@ts-ignore
    kek.push({ name: child.name.text });
    //@ts-ignore
    child.forEachChild((child) =>
      //@ts-ignore
      child.forEachChild((k) => k.forEachChild((s) => s.forEachChild((d) => console.log(d.name.text)))),
    );
  }
});

// console.log(kek);
