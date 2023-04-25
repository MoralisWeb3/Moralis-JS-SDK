import _ from 'lodash';
import { OperationV3FileReader } from './OperationV3FileReader';
import { TypeScriptOutput } from './imported/output/TypeScriptOutput';
import { Project } from 'ts-morph';
import { GeneratorWriter } from './imported/GeneratorWriter';
import fs from 'fs-extra';
import { NameFormatter } from './imported/NameFormatter';

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

      const requiredRequestParams = serializeRequestParamProps?.filter((p) => !p.isOptional);

      const className = _.upperFirst(operation.operationId);

      // const requestType = `${className}Request`;
      const requestType = operation.serializeRequest.parameters[0].type[0];
      // const responseType = `${className}Response`;
      const responseType = operation.parseResponse.returnType.type;
      const body = operation.serializeBody?.parameters[0];
      const bodyType = body?.type.join(' | ');

      const operationName = `${className}Operation`;
      const commonUtils = `moralis/common-aptos-utils`;
      const requiredParams = [...(requiredRequestParams?.map((p) => p.name) || []), ...(body ? ['body'] : [])];
      const allParams = operation.parameterNames.map((rawName: string) => NameFormatter.getParameterName(rawName));
      const hookParamsType = `Use${className}Params`;
      const hookQueryOptionsType = `Use${className}QueryOptions`;
      const hookName = `use${className}`;
      const module = `Aptos`;

      const output = new TypeScriptOutput();

      output.addImport(
        [requestType, operation.parseResponse.returnType.typeReference, ...[...(body?.type || [])], operationName],
        commonUtils,
      );
      output.addImport(['useMemo'], 'react');
      output.addImport(['QueryOptions'], '../../types');
      output.addImport(['useOperationV3Resolver', 'useQuery'], '../../utils');
      if (requiredParams.length > 0) {
        output.addImport(['validateParams'], '../../../utils/validateParams');
      }

      output.commitImports();

      output.write(
        0,
        `export type ${hookParamsType} = ${requiredParams.length > 0 ? 'Partial<' + requestType + '>' : requestType};`,
      );
      output.write(0, `export type ${hookQueryOptionsType} = QueryOptions<${responseType}, ${hookParamsType}>;`);

      output.newLine();
      output.write(
        0,
        `export function ${hookName}(${
          allParams.length > 0 ? `{ ${allParams.join(', ')} }: ${hookParamsType} = {},` : ''
        } ${bodyType ? `body?: ${bodyType},` : ''} queryOptions: ${hookQueryOptionsType} = {}) {`,
      );
      output.write(1, `const resolver = useOperationV3Resolver(${operationName});`);

      if (requiredParams.length > 0) {
        output.newLine();
        output.write(1, `const hasRequiredParams = useMemo(() => {`);
        output.write(2, `return Boolean(${requiredParams.join(' && ')});`);
        output.write(1, `}, [${requiredParams.join(', ')}]);`);
      }

      output.newLine();
      output.write(
        1,
        `const queryKey: [string, ${
          requiredParams.length > 0 ? 'Partial<' + requestType + '>' : requestType
        }] = useMemo(() => {`,
      );
      output.write(2, `return [`);
      output.write(3, `${operationName}.operationId,`);
      output.write(3, `{`);
      output.write(4, `${allParams.join(', ')}`);
      output.write(3, `},`);
      output.write(2, `];`);
      output.write(1, `}, [${allParams.join(', ')}]);`);

      output.newLine();
      output.write(1, 'return useQuery({');
      output.write(2, '...queryOptions,');
      output.write(2, 'queryKey,');
      output.write(2, 'queryFn: async ({ queryKey: [_id, request] }) => {');

      if (requiredParams.length > 0) {
        output.write(
          3,
          `const params = validateParams(request, [${requiredParams.map((param) => `'${param}'`).join(', ')}]);`,
        );
        output.write(3, `return resolver.resolve(params, ${body ? 'body' : '{}'});`);
      } else {
        output.write(3, `return resolver.resolve(request, ${body ? 'body' : '{}'});`);
      }

      output.write(2, '},');
      output.write(2, `enabled: ${requiredParams.length > 0 ? 'hasRequiredParams && ' : ''}queryOptions.enabled,`);
      output.write(1, '});');
      output.write(0, '}');

      const basePath = 'E:/Work/Moralis/Moralis-JS-SDK/packages/react/src/hooks/aptosApi/generated';
      const finalPath = `${basePath}/${hookName}.ts`;
      fs.writeFileSync(finalPath, output.toString(), 'utf-8');
      // console.log('File:\n', output.toString());
    }
  }
}

ReactHookFileGenerator.generate();
