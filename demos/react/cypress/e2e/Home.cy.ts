describe('Homepage', () => {
  it('reads NFT metadata correctly', () => {
    cy.visit('/');

    cy.get('[data-testid="getNFTMetadataButton"]').should('exist').click();

    cy.get('[data-testid="outputTextarea"]')
      .should('exist')
      .contains('0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d')
      .contains('BoredApeYachtClub');
  });

  it('reads blocks correctly', () => {
    cy.visit('/');

    cy.get('[data-testid="getBlockButton"]').should('exist').click();

    cy.get('[data-testid="outputTextarea"]')
      .should('exist')
      .contains('0x7f6233c1a3e7e0f9f09253dcb9c44bf717ddee9abf3cf77e70b750f1d31fd9a6');
  });

  it('runs function correctly', () => {
    cy.visit('/');

    cy.get('[data-testid="runContractFunctionButton"]').should('exist').click();

    cy.get('[data-testid="outputTextarea"]')
      .should('exist')
      .contains(/0x\w{40}/);
  });

  it('resolves domain correctly', () => {
    cy.visit('/');

    cy.get('[data-testid="resolveDomainButton"]').should('exist').click();

    cy.get('[data-testid="outputTextarea"]').should('exist').contains('0x8aaD44321A86b170879d7A244c1e8d360c99DdA8');
  });
});
