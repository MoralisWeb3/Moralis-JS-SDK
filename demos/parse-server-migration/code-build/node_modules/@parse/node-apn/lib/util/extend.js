module.exports = function extend(target, source) {
  /* FIXME consider using Object.entries instead - this will also include keys in the prototype if the prototype is an object with properties. Changing this may be backwards incompatible in edge cases. */
  for (const key in source) {
    if (source[key] !== undefined) {
      target[key] = source[key];
    }
  }
  return target;
};
