# @moralisweb3/eslint-config

Eslint rules, used by Moralis


## curly
Enforce curly brackets for every if-else, and try-catch statement for better readability.

## no-console
Prevent unwanted console output. If this is desired, then a function like debugOutput() or a Logger should be created. This prevents accidental debug logs in production code.

## no-var
No need to use var anymore, now that let/const have been introduced.

## no-else-return
This can result to unneeded nested if-else checks. Most of the time the logic can be restructured with early returns for better readability.


# Useage
```js
{
  "extends": "@moralisweb3",
  "rules": {
    // Additional, per-project rules...
  }
}
```