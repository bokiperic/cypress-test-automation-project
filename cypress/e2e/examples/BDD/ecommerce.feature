Feature: End to end ecommerce validation

    Application Regression

    @Regression
    Scenario: Ecommerce products delivery
        Given I open Ecommerce page
        When I add items to the card
        And Validate the total prices
        Then Select the country, submit and verify that "Thak you" is displayed

    @Smoke
    Scenario: Filling the form to shop
        Given I open Ecommerce page
        When I fill the form details
            |name | gender |
            |bob  | Female |
        Then Validate the form's behavior
        And Select the Shop Page