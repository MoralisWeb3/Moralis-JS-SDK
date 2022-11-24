# @moralisweb3/eslint-config

Eslint rules, used by Moralis for projects with TypeScript.

These rules are based on community standards and inspired by the airbnb and google presets, without taking too much opinionated/formatting rules into account.

# Usage

## 1. Install dependencies

```sh
npm install @moralisweb3/eslint-config \
            @typescript-eslint/eslint-plugin@^5.13.0 \
            @eslint-plugin-etc@^2.0.2 \
            @typescript-eslint/parser@^5.0.0 \
            --save-dev
```

or
```sh
yarn add @moralisweb3/eslint-config \
         @typescript-eslint/eslint-plugin@^5.13.0 \
         @eslint-plugin-etc@^2.0.2 \
         @typescript-eslint/parser@^5.0.0 \
         -D
```

## 2. Configure Eslint

Add `@moralisweb3` to your eslint config file (`.eslint` or .`eslint.js`), or create a new one if it doesn't exist.


```diff
extends: [
+ '@moralisweb3'
]
```

Add any additional rules/plugins etc. you want to use.

```js
{
  extends: ['@moralisweb3'],
  plugins: [/* any plugins */],
  rules: {
    // Any other rules
  }
};
```

## 3. Configure the ESLint TypeScript parser

This config requires knowledge of your TypeScript config.

In your ESLint config, set [parserOptions.project](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#parseroptionsproject) to the path of your `tsconfig.json`.

For example:

```diff
{
  extends: ['@moralisweb3'],
+ parserOptions: {
+   project: './tsconfig.json'
+ }
}
```

## 4. Run eslnt
Run eslint via
```
npx eslint . --ext .js,.ts,.tsx,jsx
```

# FAQ
## I get this error when running ESLint: "The file must be included in at least one of the projects provided"

This means you are attempting to lint a file that `tsconfig.json` doesn't include.

A common fix is to create a `tsconfig.eslint.json` file, which extends your `tsconfig.json` file and includes all files you are linting.

```json
{
  "extends": "./tsconfig.json",
  "include": ["src/**/*.ts", "src/**/*.js", "test/**/*.ts"]
}
```

Update your ESLint config file:

```diff
parserOptions: {
-  project: './tsconfig.json',
+  project: './tsconfig.eslint.json',
}
```
## Why do I need the peer dependencies?

`@typescript-eslint/eslint-plugin` is a peer dependency due to a limitation within ESLint. See [issue](https://github.com/eslint/eslint/issues/3458), [RFC](https://github.com/eslint/rfcs/tree/master/designs/2019-config-simplification), and [progress](https://github.com/eslint/eslint/issues/13481).

`@typescript-eslint/parser` is a peer dependency because the version number must match `@typescript-eslint/eslint-plugin`.
