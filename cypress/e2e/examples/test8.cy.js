/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

// Handling iFrames
describe('Frames Test', function()
{
    it('Demo example', function() {

        cy.visit("www.rahulshettyacademy.com/AutomationPractice/")
        
        // Load frame into the Cypress object
        cy.frameLoaded("#courses-iframe")

        // Switch to frame (which was loaded into the Cypress object)
        cy.iframe().find("a[href*='mentorship'] ").eq(0).click() // from 7 results that "a[href*='mentorship']" will return, take the first one and click on it
        cy.iframe().find(".pricing-container").should('have.length', 2)
    })  


})