describe('testing login component', () => {
    it('the application runs', () => {
        cy.visit('http://localhost:4200/login');
        cy.get('[error-cy=errorMessage]').invoke('text').then((text) => {
            expect(text).to.not.equal('some error')
        });
    })
})