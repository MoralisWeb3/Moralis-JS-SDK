import { Project } from 'ts-morph';
import { OperationV3FileReader } from './OperationV3FileReader';

function main() {
  const project = new Project();
  const sourceFiles = project.addSourceFilesAtPaths([
    'E:/Work/Moralis/Moralis-JS-SDK/packages/common/aptosUtils/src/generated/operations/!(index|operations).ts',
  ]);

  sourceFiles.map((sourceFile) => {
    const opV3FileReader = OperationV3FileReader.create(sourceFile);
    const opV3Info = opV3FileReader.read();
    console.log('opV3Info:', JSON.stringify(opV3Info, null, 2));
  });
}

main();
