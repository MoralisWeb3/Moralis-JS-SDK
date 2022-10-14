/* eslint-disable etc/no-commented-out-code */
/* eslint-disable no-console */
// import _ from 'lodash';
import _ from 'lodash';
import { Project, PropertySignature, SyntaxKind, TypeLiteralNode } from 'ts-morph';
// import { tsquery } from '@phenomnomnominal/tsquery';

// import { replaceSnakeWithCamel } from './utils/format';

const project = new Project({
  tsConfigFilePath: './packages/codegen2/tsconfig.json',
});

const sourceFile = project.addSourceFileAtPath('./packages/evmApi/src/generated/types.ts');
// const typesComponentsFile = project.createSourceFile('./packages/evmApi/src/generated/typesComponents.ts', undefined, {
//   overwrite: true,
// });

const componentsInterface = sourceFile.getInterfaceOrThrow('components');

const schemasPropertySignature = componentsInterface?.getPropertyOrThrow('schemas');

const schemasTypeLiterals = schemasPropertySignature.getChildrenOfKind(SyntaxKind.TypeLiteral);

const parseTypeForTypeLiteral = (node: TypeLiteralNode) => {
  return node.getProperties().map((x) => {
    const [docs] = x.getJsDocs();
    return [docs?.getText() || '', x.getText()].join('\n');
  });
};

schemasTypeLiterals.forEach((schemasTypeLiteral) => {
  const schemasProps = schemasTypeLiteral.getProperties();
  const components = schemasProps.map((component) => {
    const types = component.getChildren().map((child) => {
      const typesFinal = [];
      if (child.isKind(SyntaxKind.TypeLiteral)) {
        typesFinal.push(parseTypeForTypeLiteral(child));
        // const ps = child.getProperties();
        // ps.forEach((x) => {
        //   const [docs] = x.getJsDocs();
        //   typesFinal.push([docs?.getText() || '', x.getText()].join('\n'));
        // });
      }

      if (child.isKind(SyntaxKind.IntersectionType)) {
        const childs = child.getChildrenOfKind(SyntaxKind.TypeLiteral);
        const wow = childs.map((hhh) => parseTypeForTypeLiteral(hhh));
        // // const k = childs.map((childxxx) => childxxx.getType().getText()).flat(1);
        typesFinal.push(wow.flat(1));
        // // const ps = child.getProperties();
        // // ps.forEach((x) => {
        // //   const [docs] = x.getJsDocs();
        // //   typesFinal.push([docs?.getText() || '', x.getText()].join('\n'));
        // // });
      }

      if (child.isKind(SyntaxKind.UnionType)) {
        const parent = child.getParentOrThrow() as PropertySignature;
        const [docs] = parent.getJsDocs();

        typesFinal.push([docs.getText(), parent.getText()].join('\n'));
      }

      return typesFinal;
    });
    return {
      name: component.getName(),
      type: _.flattenDeep(types).join(''),
    };
  });
  // console.log(components);
  components.forEach((comp) => console.log(comp.name));
  console.log('total amount:', components.length);
});

// const schemasProps = schemasTypeLiteral.getProperties();

// schemasProps.forEach((component) => {
// typesComponentsFile.addStatements(
//   `export interface ${_.upperFirst(component.getName())}Params \n ${replaceSnakeWithCamel(
//     component.getTypeNodeOrThrow().getText(),
//   )}`,
// );
// return {
//   name: _.upperFirst(component.getName()),
//   type: replaceSnakeWithCamel(component.getTypeNodeOrThrow().getText()),
// };
// });
// console.log(schemas);
// typesComponentsFile.formatText();
// typesComponentsFile.save();
