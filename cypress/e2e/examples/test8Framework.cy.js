/// <reference types="Cypress" />

describe('Framework building start', function() {

    // All setup related methods should go into the 'before' method
    before(function() {
        cy.fixture('userFormData').then(function(data) {
            this.data = data
        })
    })

    it('First test case', function() {
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        cy.get('input[name="name"]:nth-child(2)').type(this.data.name)
        cy.get('select').select(this.data.gender)
        cy.get(':nth-child(4) > .ng-untouched').should('have.value', this.data.name) // can be done in more lines using promices (done earlier), but since we only need to validate we can use this shorter method
        cy.get('input[name="name"]:nth-child(2)').should('have.attr', 'minlength', '2') // can be done in more lines using promices, with prop() method (done earlier), but since we only need to validate we can use this shorter method
        cy.get('#inlineRadio3').should('be.disabled')
        
        // Navigate to Shop page
        cy.get(':nth-child(2) > .nav-link').click()
        cy.selectProduct('Blackberry')
    })

})