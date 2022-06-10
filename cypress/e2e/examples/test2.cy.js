/// <reference types="Cypress" />

describe('My Second Test Suite', function()
{
    it('My First Test Case', function() {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type('ca')
        cy.wait(1000)
        
        cy.get('.products').as('productLocator')

        cy.get('@productLocator').find('.product').each(($el, index, $list) => {
            const textVeg = $el.find('h4.product-name').text()
            
            if(textVeg.includes('Cashews')) {
                // cy.wrap will resolve promice $el, so the click() method won't be depricated
                cy.wrap($el).find('button').click()
            }

        })

        cy.get('.cart-icon > img').as('cartIcon')
        cy.get('@cartIcon').click()
        
        cy.contains('PROCEED TO CHECKOUT').click()
        
        cy.get(':nth-child(14)').as('placeOrderButton')
        cy.get('@placeOrderButton').click()
    })


})