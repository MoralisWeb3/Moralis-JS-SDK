describe('Moralis Client Demo (Webpack) Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Successfully renders "Moralis Client Demo (Webpack)" header', () => {
    cy.get('h1:contains("Moralis Client Demo (Webpack)")');
  });
});
