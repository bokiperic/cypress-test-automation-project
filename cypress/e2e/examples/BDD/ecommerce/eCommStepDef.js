import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../../../support/pageObjects/HomePage";
import ProductPage from "../../../../support/pageObjects/ProductPage";
const homePage = new HomePage()
const productPage = new ProductPage()

Given('I open Ecommerce page', () => {
    cy.visit(Cypress.env('baseUrl') + "/angularpractice/")
})
When('I add items to the card', function () { // if you use hooks (like 'beforeEach' for taking fixtures) Mocha doesn't support shorthand functions operator '() =>' so whereever you have that data pulled from it (like here 'data.something) you need to write 'function()' notation.
    homePage.getShopTab().click()
        this.data.productName.forEach(function(element) {
            cy.selectProduct(element)
        })
        productPage.checkOutButton().click()
})
When('Validate the total prices', () => {
    var sum = 0
    cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
        cy.log($el.text())
        var actualPrice = $el.text().split(". ")
        actualPrice = actualPrice[1].trim()
        cy.log(actualPrice)
         sum = Number(sum) + Number(actualPrice)
    }).then(function() {
        cy.log(sum)
    })
    cy.get('h3 strong').then(function(element) {
        const amount = element.text()
        var res = amount.split(". ")
        const total = res[1].trim()

        expect(Number(total)).to.equal(sum)
    })
})
Then('Select the country, submit and verify that \"Thak you\" is displayed', () => {
    cy.contains('Checkout').click()
        cy.get('#country').type('India')
        cy.get('.suggestions > ul > li > a').click()
        cy.get('#checkbox2').click({force: true})
        cy.get('input[type="submit"]').click()

        cy.get('.alert').then(function(element) {
            const actualText = element.text()
            expect(actualText.includes("Success!")).to.be.true
        })
})

// Given('I open Ecommerce page' is already defined, so we're skip it
When('I fill the form details', function(dataTable) {
    homePage.getEditBox().type(dataTable.rawTable[1][0])
    homePage.getGender().select(dataTable.rawTable[1][1])
})
Then('Validate the form\'s behavior', function(dataTable) {
    homePage.getTwoWayDataBiding().should('have.value', dataTable.rawTable[1][0])
    homePage.getEditBox().should('have.attr', 'minlength', '2')
    homePage.getEnterpreneur().should('be.disabled')
    Cypress.config('defaultCommadTimeout', 5000)
})
When('Select the Shop Page', () => {
    homePage.getShopTab().click()
})