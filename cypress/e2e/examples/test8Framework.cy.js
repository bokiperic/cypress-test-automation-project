/// <reference types="Cypress" />

import HomePage from "../../support/pageObjects/HomePage.js"
import ProductPage from "../../support/pageObjects/ProductPage.js"

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

        cy.visit(Cypress.env('baseUrl') + "/angularpractice/" )
        homePage.getEditBox().type(this.data.name)
        homePage.getGender().select(this.data.gender)
        homePage.getTwoWayDataBiding().should('have.value', this.data.name) // can be done in more lines using promices (done earlier), but since we only need to validate we can use this shorter method
        homePage.getEditBox().should('have.attr', 'minlength', '2') // can be done in more lines using promices, with prop() method (done earlier), but since we only need to validate we can use this shorter method

        // WIll pause the runnninng of the test for debugging
        // cy.pause() or cy.commad(parameters).debug(), example:
        // cy.get('select').select(this.data.gender).debug()

        homePage.getEnterpreneur().should('be.disabled')
        Cypress.config('defaultCommadTimeout', 5000) // local configuration (part 3 Framework creation)
        
        // Navigate to Shop page
        homePage.getShopTab().click()

        // For 1 element (hardcoded)
        // cy.selectProduct('Blackberry') // Using Custom Cypresss Command (defined in support/commands.js file)

        // For more elements pulled from JSON
        this.data.productName.forEach(function(element) {
            cy.selectProduct(element)
        })
        
        // Opens Checkout page for validation and continue to finish the whole purchase flow
        productPage.checkOutButton().click()

        var sum = 0
        cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
            cy.log($el.text())
            var actualPrice = $el.text().split(". ")
            actualPrice = actualPrice[1].trim()
            cy.log(actualPrice)
            sum = Number(sum) + Number(actualPrice)
        }).then(function() {
            cy.log(sum) // Because JS is asynchronous and 'sum' is initialized as 0 so it exists ad it will be printed before all the sum-up is done in 'each' loop
        })
        cy.get('h3 strong').then(function(element) {
            const amount = element.text()
            var res = amount.split(". ")
            const total = res[1].trim()

            expect(Number(total)).to.equal(sum)
        })
        cy.contains('Checkout').click()
        cy.get('#country').type('India')
        // cy.get('.suggestions > ul > li > a').click()
        cy.get('#checkbox2').click({force: true}) // since checkbox will be under the other element, so we need this force click in order to click it
        cy.get('input[type="submit"]').click()

        // One way:
        // cy.get('.alert').should('contain.text', "Success!")
        // Another way:
        cy.get('.alert').then(function(element) {
            const actualText = element.text()
            expect(actualText.includes("Success!")).to.be.true
        })
        // Third way:
        // cy.get('.alert').should('include.text', "Success!")
        
    })

})