export const urlPatternToExpressPath = (urlPattern: string) => urlPattern.replaceAll(/\{/g, ':').replaceAll(/\}/g, '');
