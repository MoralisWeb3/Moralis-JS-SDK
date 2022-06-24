
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

    test('MoralisCore');
    test('MoralisCore.default.name');

    test('MoralisEvm');
    test('MoralisEvm.default.name');

    test('MoralisEvmApi');
    test('MoralisEvmApi.name');

    test('MoralisServer');
    test('MoralisServer.default.name');

    test('MoralisEvmConnectorUtils');
    test('MoralisEvmConnectorUtils.getMoralisRpcs');

    test('MoralisEvmMetamaskConnector');
    test('MoralisEvmMetamaskConnector.name');

    test('MoralisEvmWalletconnectConnector');
    test('MoralisEvmWalletconnectConnector.name');

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

    result.value = passed ? 'Passed' : 'Error';
});
