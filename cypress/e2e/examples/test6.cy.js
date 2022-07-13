/// <reference types="Cypress" />

describe('My Sixth Test Suite', function()
{
    it('My First Test Case', function() {

        // Handling mouse hover popups
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('div .mouse-hover-content').invoke('show')
        cy.contains('Top').click()
        // If we would't have cy.get('div.mouse-hover-content').invoke('show'), we would use this to click (and popup won't be opened):
        // cy.contains('Top').click({force: true})
        cy.url().should('include', 'top')
    })  


})