/// <reference types="Cypress" />

describe('My First Test Suite', function()
{
    it('My First Test Case', function() {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type('ca')
        cy.wait(1000)
        cy.get('.product:visible').should('have.have.length', 4)
        
        // Parent-child chaining
        cy.get('.products').as('productLocator') // Giving the Allias
        cy.get('@productLocator').find('.product').should('have.length', 4) // Using the Allias
        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click()

        // Iterate over the array with each() command
        cy.get('@productLocator').find('.product').each(($el, index, $list) => {
            const textVeg = $el.find('h4.product-name').text()
            
            if(textVeg.includes('Cashews')) {
                // cy.wrap will resolve promice $el, so the click() method won't be depricated
                cy.wrap($el).find('button').click()
            }

        })

        cy.get('.brand').should('have.text', 'GREENKART')

        // Manually resolve promise using ".then()"" function
        // In Cypress, don't use variables on standard way, but via the then() method
        cy.get('.brand').then(function(logoelement) {
            cy.log(logoelement.text()) // Will be printed in the Cypress tests timeline
            console.log('This is log printed in DevTools Console')
        })
    
    })


})