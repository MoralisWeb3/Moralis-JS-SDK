/* eslint-disable etc/no-commented-out-code */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import _ from 'lodash';
import { Project, SyntaxKind } from 'ts-morph';
import { replaceSnakeWithCamel } from './utils/format';

const project = new Project({
  tsConfigFilePath: './packages/codegen2/tsconfig.json',
});

const sourceFile = project.addSourceFileAtPath('./packages/evmApi/src/generated/types.ts');

// const pathsInterface = sourceFile.getInterface('paths');
// const componentsInterface = sourceFile.getInterface('components');
const operationsInterface = sourceFile.getInterface('operations');
// QueryParams
// PathParams
// ApiParams

// /** Get the contents of a block by block hash. */
// getBlock: {
//     parameters: {
//       query: {
//         /** The chain to query */
//         chain?: components["schemas"]["chainList"];
//         /** The subdomain of the moralis server to use (Only use when selecting local devchain as chain) */
//         subdomain?: string;
//       };
//       path: {
//         /** The block hash or block number */
//         block_number_or_hash: string;
//       };
//     };
//     responses: {
//       /** Returns the contents of a block */
//       200: {
//         content: {
//           "application/json": components["schemas"]["block"];
//         };
//       };
//     };
//   };
const kek = project.createSourceFile('./packages/evmApi/src/generated/types2.ts', undefined, { overwrite: true });
operationsInterface?.getProperties().forEach((x) => {
  const name = x.getName();

  // const kekInterface = kek.addInterface({ name });

    // const [jsDoc] = x.getJsDocs();
  //   console.log({ name, jsDoc: jsDoc.getDescription() });
  // let finalType = '';
  x.forEachChild((xxx) => {
    if (xxx.isKind(SyntaxKind.TypeLiteral)) {
      //   const responses = xxx.getProperty('responses');

      const parameters = xxx.getProperty('parameters');
      //   let interface: string;
      const s = parameters?.getFirstChildByKind(SyntaxKind.TypeLiteral);
      if (!s) {
        return;
      }
      const queryProps = s.getProperties();

      const hhh = queryProps.map((queryProp) =>
        queryProp
          ?.getChildrenOfKind(SyntaxKind.TypeLiteral)
          .map((xxxxx) => xxxxx.getProperties().map((child) => child.getText(true))),
      );

      kek.addStatements(
        `export interface ${_.upperFirst(name)}Params {\n ${replaceSnakeWithCamel(_.flattenDeep(hhh).join('\n'))} }`,
      );
    }
  });
});
kek.formatText();
kek.save();
