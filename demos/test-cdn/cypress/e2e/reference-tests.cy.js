
describe('reference-tests', () => {

  it('all UMD tests passed', () => {
    cy.visit('/demos/test-cdn/public/reference-tests.umd.html');

    cy.get('[test-id=result]', {
      timeout: 2000
    }).should('have.value', 'Passed');
  });
});
