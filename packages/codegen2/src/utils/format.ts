export const replaceSnakeWithCamel = (str: string) =>
  str.replace(/([-_][a-z])/gi, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
