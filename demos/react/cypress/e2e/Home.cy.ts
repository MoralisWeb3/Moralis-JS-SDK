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
      .contains('0x258b69b4152d42da8b5d2952f51b7ff72210e8dfe5e7bc441a291175d7e635e7');
  });

  it('runs function correctly', () => {
    cy.visit('/');

    cy.get('[data-testid="runContractFunctionButton"]').should('exist').click();

    cy.get('[data-testid="outputTextarea"]').should('exist').contains('0xe2A83b15FC300D8457eB9E176f98d92a8FF40a49');
  });

  it('resolves domain correctly', () => {
    cy.visit('/');

    cy.get('[data-testid="resolveDomainButton"]').should('exist').click();

    cy.get('[data-testid="outputTextarea"]').should('exist').contains('0x8aaD44321A86b170879d7A244c1e8d360c99DdA8');
  });
});
