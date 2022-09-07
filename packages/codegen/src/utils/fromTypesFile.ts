import { Project } from 'ts-morph';

const project = new Project({
  tsConfigFilePath: './packages/codegen/tsconfig.json',
  //   skipAddingFilesFromTsConfig: false,
});

const sourceFile = project.addSourceFileAtPath(
  './packages/next/src/hooks/generated/EvmApi/account/useEvmTokenBalances/types.ts',
);
const kek = sourceFile.getTypeAliasOrThrow('TUseEvmTokenBalancesParams');
console.log(kek.getTypeNode()?.getText());
