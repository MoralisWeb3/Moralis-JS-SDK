/* eslint-disable no-console */
const filteredWarnings = [
  // Optional dependency, where we handle the dependency check on run-time
  '@walletconnect/web3-provider',
];

/**
 * Filters console messages that include text from the blacklist
 */
const filterConsole = () => {
  const warnFn = console.log;

  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      filteredWarnings.filter(filter => args[0].includes(args[0])).length > 1
    ) {
      return;
    }

    return warnFn;
  };
};

module.exports = {
  filterConsole,
};
