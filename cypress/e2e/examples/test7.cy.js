/// <reference types="Cypress" />

describe('My Seventh Test Suite', function()
{
    it('My First Test Case', function() {

        // Handling Child Windows with getting 'href' attribute
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#opentab').then(function(el) {
            const url = el.prop('href')
            cy.visit(url) // Won't work because this is located on another domain
        })
    })  


})