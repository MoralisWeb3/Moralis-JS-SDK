import { OperationV3FileReader } from './OperationV3FileReader';
import { TypeScriptOutput } from './imported/output/TypeScriptOutput';
import { Project } from 'ts-morph';

export class ReactHookFileGenerator {
  public static generate() {
    const project = new Project();
    const sourceFiles = project.addSourceFilesAtPaths([
      'E:/Work/Moralis/Moralis-JS-SDK/packages/common/aptosUtils/src/generated/operations/!(index|operations).ts',
    ]);

    const operations = sourceFiles.map((sourceFile) => {
      const opV3FileReader = OperationV3FileReader.create(sourceFile);
      return opV3FileReader.read();
    });

    for (const operation of operations) {
      const serializeRequestParamProps = operation.serializeRequest.parameters[0].properties.byType;

      const serializeBodyParam = operation?.serializeBody?.parameters[0];
      const serializeBodyParamProps = serializeBodyParam?.properties.byType;
      const hookParams = [...(serializeRequestParamProps || []), ...(serializeBodyParamProps || [])];
      const requiredHookParams = hookParams.filter((p) => !p.isOptional);
      console.log(operation.operationId, ': ', { requiredHookParams });
      // const templateData = {
      //   requestType: operation.serializeRequest.parameterTypeName,
      //   responseType: operation.parseResponse.returnTypeName,
      //   operationId: operation.operationObjectProperties.operationId,
      //   //     useResolver,
      //   //     module: _.upperFirst(this.module),
      //   //     operation: `${operation.name}Operation`,
      //   //     commonUtils: this.moduleGenerator.operationsPackageName,
      //   //     hookParamsType: `${_.upperFirst(name)}Params`,
      //   //     hookQueryOptionsType: `${_.upperFirst(name)}QueryOptions`,
      //   requiredParams: serializeRequestParamProps
      //     .filter((p: { isOptional: boolean }) => !p.isOptional)
      //     .map((p: { name: string }) => p.name),
      //   optionalParams: serializeRequestParamProps
      //     .filter((p: { isOptional: boolean }) => p.isOptional)
      //     .map((p: { name: string }) => p.name),
      // };

      // console.log('templateData:', JSON.stringify(templateData, null, 2));
    }

    // const templateData = {
    //     requestType: `${_.upperFirst(operation.name)}Request`,
    //     responseType: `${_.upperFirst(operation.name)}Response`,
    //     name,
    //     useResolver,
    //     module: _.upperFirst(this.module),
    //     operation: `${operation.name}Operation`,
    //     commonUtils: this.moduleGenerator.operationsPackageName,
    //     hookParamsType: `${_.upperFirst(name)}Params`,
    //     hookQueryOptionsType: `${_.upperFirst(name)}QueryOptions`,
    //     requiredParams,
    //     allParams,
    //     isNullable,
    //   };
  }
}

ReactHookFileGenerator.generate();
