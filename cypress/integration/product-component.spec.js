describe('testing of the product component', () => {
    it('mock api call', () => {
        cy.server();
        cy.route({
            method: 'GET',
            url: 'http://localhost:4200/api/product/Asus',
            status: 200,
            respone: 'fixture:product.json'
        });
        cy.visit('http://localhost:4200/product/Asus');
        cy.get('[data-cy=productData]').should('have.length', 2)
    })
})