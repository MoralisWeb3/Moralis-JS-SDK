describe('Moralis React Demo Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('successfully renders "Home" header', () => {
    cy.get('h2:contains("Home")');
  });
  it('web3ApiVersion button click throws "apiKey is not set" error', () => {
    cy.get('button:contains("web3ApiVersion")').click();

    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('[A0003] apiKey is not set')) {
        return false;
      }
    });
  });
});
