describe('Moralis Client Demo Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Successfully renders "Moralis Client Demo (UMD)" header', () => {
    cy.get('h1:contains("Moralis Client Demo (UMD)")');
  });
  it('Get EVM tokens prints "apiKey is not set"', () => {
    cy.get('#eth-address-input').type('0x75e3e9c92162e62000425c98769965a76c2e387a');
    cy.get('#eth-btn-submit').click();
    expect(cy.get('#eth-result').contains('apiKey is not set'));
  });
  it('Get Solana tokens prints "apiKey is not set"', () => {
    cy.get('#sol-address-input').type('BWeBmN8zYDXgx2tnGj72cA533GZEWAVeqR9Eu29txaen');
    cy.get('#sol-btn-submit').click();
    expect(cy.get('#sol-result').contains('apiKey is not set'));
  });
});
