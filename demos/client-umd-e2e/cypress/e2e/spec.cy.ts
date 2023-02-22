describe('Moralis Client Demo Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Successfully renders "Moralis Client Demo (UMD)" header', () => {
    cy.get('h1:contains("Moralis Client Demo (UMD)")');
  });
});
