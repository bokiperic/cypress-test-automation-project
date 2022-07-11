/// <reference types="Cypress" />

// Alerts, Popups, Child Windows (invoke, removeAttr functions)
describe('My Forth Test Suite', function()
{
    it('My First Test Case', function() {

        // Alerts & Popups
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#alertbtn').click()
        cy.get('[value="Confirm"]').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })
        cy.get('#confirmbtn').click()
        cy.on('window:confirm', (str) => {
            expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })

        // Invoke() and removeAttr(), go()
        cy.get('#opentab').invoke('removeAttr', 'target').click() // this click() will open link in the same tab/page
        cy.url().should('include', 'rahulshettyacademy')

        cy.go('back')
    })


})