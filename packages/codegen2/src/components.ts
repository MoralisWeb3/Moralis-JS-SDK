/* eslint-disable etc/no-commented-out-code */
/* eslint-disable no-console */
import _ from 'lodash';
import { Project, SyntaxKind } from 'ts-morph';
import { replaceSnakeWithCamel } from './utils/format';

const project = new Project({
  tsConfigFilePath: './packages/codegen2/tsconfig.json',
});

const sourceFile = project.addSourceFileAtPath('./packages/evmApi/src/generated/types.ts');
const typesComponentsFile = project.createSourceFile('./packages/evmApi/src/generated/typesComponents.ts', undefined, {
  overwrite: true,
});

const componentsInterface = sourceFile.getInterfaceOrThrow('components');

// const schemasPropertySignature = componentsInterface?.getPropertyOrThrow('schemas');

// const schemasTypeLiteral = schemasPropertySignature.getFirstChildByKindOrThrow(SyntaxKind.TypeLiteral);

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
