
describe('local', () => {

    it('all CDN tests passed', () => {
        cy.visit('/demos/test-cdn/public/local.html');

        cy.get('[test-id=result]', {
            timeout: 2000
        }).should('have.value', 'Passed');
    });
});
