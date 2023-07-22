beforeEach( () => {
    cy.fixture('userFormData').then(function(data) {
        this.data=data
    })
});