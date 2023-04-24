import { Node, Symbol } from 'ts-morph';

export class TsSymbolReader {
  private constructor(private tsProperty: Symbol) {}

  public static create(tsProperty: Symbol) {
    return new TsSymbolReader(tsProperty);
  }

  public get jsDoc() {
    const jsDocTag = this.tsProperty.getJsDocTags()[0];

    return jsDocTag
      ?.getText()
      .map((part) => part.text)
      .join(' ')
      .trim();
  }

  public get name() {
    return this.tsProperty.getName();
  }

  public get isOptional() {
    return this.tsProperty.isOptional();
  }

  public get type() {
    const valueDeclaration = this.tsProperty.getValueDeclaration();

    const isPropertySignatureOrDeclaration =
      Node.isPropertySignature(valueDeclaration) || Node.isPropertyDeclaration(valueDeclaration);

    if (!valueDeclaration || !isPropertySignatureOrDeclaration) {
      return 'unknown';
    }

    const typeNode = valueDeclaration.getTypeNode();

    if (!typeNode) {
      return 'unknown';
    }

    return typeNode.getText();
  }

  public read() {
    return {
      name: this.name,
      type: this.type,
      jsDoc: this.jsDoc,
      isOptional: this.isOptional,
    };
  }
}
