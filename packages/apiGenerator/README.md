# API Generator

This package provides a generator that can be used to generate a strong typed client based on a OpenAPI specification.

Supported versions of the OpenAPI specification:
* 3.0.x

Supported languages:
* TypeScript

## How to Run?

You need to call the generator by `ts-node` and provide the path to the folder with the configuration file. The configuration file is called `generator.config.json`.

```
ts-node src/index.ts ../../common/aptosUtils
```

## Architecture

The generator is split into two parts: 

* The OpenAPI reader - it's responsible for reading the OpenAPI specification and creating normalized data structures that can be used by the generator. That data structure is called a contract. This architecture allows us to support multiple versions of the OpenAPI specification. Additionally, the data structure of the contract is designed for easy generating the object-oriented structure.
* The generator - it's responsible for generating the code based on the contract data structure.
