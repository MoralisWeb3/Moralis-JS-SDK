/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { Project } from 'ts-morph';

const project = new Project({
  tsConfigFilePath: './packages/codegen/tsconfig.json',
  //   skipAddingFilesFromTsConfig: false,
});

const sourceFile = project.addSourceFileAtPath('./packages/evmApi/src/EvmApi.ts');
const kek = sourceFile.getTypeAliases();
console.log(kek);
// const EvpApiClass = sourceFile.getClass('MoralisEvmApi');

// if (!EvpApiClass) {
//   throw new Error('EvpApiClass not found');
// }
// const istanceethods = EvpApiClass.getInstanceProperty('native');
// if (istanceethods?.isKind(SyntaxKind.PropertyDeclaration)) {
//   const kek = istanceethods
//     .getInitializerIfKind(SyntaxKind.ObjectLiteralExpression)
//     ?.getChildrenOfKind(SyntaxKind.PropertyAssignment);
//   //@ts-ignore
//   kek?.forEach((x) => console.log(`${x.getName()}: `, x.getType().getText(x)));
// }
// // istanceethods.getMe
// // (istanceethods as unk SyntaxKind.PropertyDeclaration)?.getKindName();
// // istanceethods.forEach((met) => console.log(met.getName()));
// // console.log(EvpApiClass.getInstanceMethods()[0].getName());

// // // .native, .account etc.
// // const instanceProps = EvpApiClass.getInstanceProperties();
// // // const config: any[] = [];
// // instanceProps?.forEach((instanceProp) => {
// //   //PropertyDeclaration
// //   //   instanceProp.forEachChild((child) => {
// //   //     if (child.getKindName() === 'PropertyDeclaration')
// //   //     console.log(child);
// //   //   });

// //   const objLiteralExpressions = instanceProp.getChildrenOfKind(SyntaxKind.ObjectLiteralExpression);
// //   //@ts-ignore
// //   objLiteralExpressions.forEach((objLiteralExpression) => {
// //     //@ts-ignore
// //     // console.log(objLiteralExpression?.name);
// //     const targetMethodsOfObj = objLiteralExpression.getChildrenOfKind(SyntaxKind.PropertyAssignment);
// //     targetMethodsOfObj.forEach((targetMethodOfObj) => {
// //       console.log(' targetmethod name: ', targetMethodOfObj.getKindName());
// //     });
// //     // targetMethodsOfObj.forEach((targetMethodOfObj) => {
// //     //   if (targetMethodOfObj.getKind() === SyntaxKind.PropertyAssignment) {
// //     //     // FunctionDeclaration
// //     //     //@ts-ignore
// //     //     console.log(targetMethodOfObj?.name);
// //     //   }
// //     // });
// //     // const filteredTargetMethodsOfObj = targetMethodsOfObj.filter((property) => property.isKind(SyntaxKind.PropertyAssignment));
// //     // targetMethodsOfObj.forEach((targetMethodOfObj) )
// //     // console.log(targetMethodsOfObj[0].getKindName());
// //   });
// //   //   console.log(instanceProp.getKindName());
// //   //   instanceProp.forEachChild((child) => console.log(child.getKindName()));
// // });
// // // methods?.forEach((method) => console.log(method.getChildren));
