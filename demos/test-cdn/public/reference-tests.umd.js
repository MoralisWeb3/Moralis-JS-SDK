
class Logger {
  constructor(element) {
    this.element = element;
  }

  write(color, text) {
    const item = document.createElement('div');
    item.style.color = color;
    item.innerText = text;
    this.element.appendChild(item);
  }

  log(text) {
    this.write('gray', text);
  }

  error(text) {
    this.write('red', text);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const logger = new Logger(document.getElementById('log'));
  const result = document.querySelector('input[test-id=result]');

  let passed = true;

  function test(expression) {
    try {
      const instance = new Function('return ' + expression)();
      if (!instance) {
        throw new Error('Value cannot be null or undefined');
      }
      logger.log(`${expression}  = ${typeof (instance)}`);
    } catch (e) {
      passed = false;
      logger.error(e + ` (${expression})`);
    }
  }

  test('Moralis');
  test('Moralis.start');
  test('Moralis.Core');
  test('Moralis.Core.name');
  test('Moralis.Server');
  test('Moralis.Server.name');
  test('Moralis.Evm');
  test('Moralis.Evm.name');
  test('Moralis.EvmApi');
  test('Moralis.EvmApi.name');

  test('WalletConnectConnector');
  test('WalletConnectConnector.name');

  result.value = passed ? 'Passed' : 'Error';
});
