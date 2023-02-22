describe('Moralis React Demo Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('successfully renders "Home" header', () => {
    cy.get('h2:contains("Home")');
  });
});
