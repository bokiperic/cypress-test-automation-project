/// <reference types="Cypress" />

import HomePage from "../pageObjects/homePage"
import ProductPage from "../pageObjects/ProductPage"

describe('Framework building start', function() {

    // All setup related methods should go into the 'before' method
    before(function() {
        cy.fixture('userFormData').then(function(data) {
            this.data = data
        })
    })

    it('First test case', function() {

        const homePage = new HomePage()
        const productPage = new ProductPage()

        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        homePage.getEditBox().type(this.data.name)
        homePage.getGender().select(this.data.gender)
        homePage.getTwoWayDataBiding().should('have.value', this.data.name) // can be done in more lines using promices (done earlier), but since we only need to validate we can use this shorter method
        homePage.getEditBox().should('have.attr', 'minlength', '2') // can be done in more lines using promices, with prop() method (done earlier), but since we only need to validate we can use this shorter method

        // WIll pause the runnninng of the test for debugging
        // cy.pause() or cy.commad(parameters).debug(), example:
        // cy.get('select').select(this.data.gender).debug()

        homePage.getEnterpreneur().should('be.disabled')
        
        // Navigate to Shop page
        homePage.getShopTab().click()

        // For 1 element (hardcoded)
        // cy.selectProduct('Blackberry') // Using Custom Cypresss Command (defined in support/commands.js file)

        // For more elements pulled from JSON
        this.data.productName.forEach(function(element) {
            cy.selectProduct(element)
        })
        
        // Opens Checkout page for validation
        productPage.checkOutButton().click()

    })

})