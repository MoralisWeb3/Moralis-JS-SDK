const methods = ['evmGetBlockTest', 'aptosGetBlockByHeightTest', 'solGetNFTMetadataTest'];

function tests(url: string) {
  beforeEach(() => {
    cy.visit(url);
  });

  async function runScript(code: string): Promise<any> {
    return new Promise((resolve) => {
      cy.window().then(async (window) => {
        const result = await window.eval(code);
        resolve(result);
      });
    });
  }

  methods.forEach((method) =>
    it(`passes ${method}()`, async () => {
      expect(await runScript(`window.${method}();`)).to.be.true;
    }),
  );
}

describe('API Tests - ESM', () => tests('esm-api-tests.html'));
describe('API Tests - UMD', () => tests('umd-api-tests.html'));
