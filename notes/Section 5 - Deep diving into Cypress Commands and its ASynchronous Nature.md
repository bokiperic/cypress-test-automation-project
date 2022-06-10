# Deep diving into Cypress commands

Websites made for people to practice test automation based on different technologies can be found on https://rahulshettyacademy.com/#/index and from there go to *Practice Projects*

Cypress Dark mode/themes: https://www.npmjs.com/package/cypress-dark

Parent-child chaining: ```cy.get('.products').find('.product')```

All the Cypress commands can be found at https://docs.cypress.io/api/api/table-of-contents.html 

Cypress is **ASYNCHRONOUS** by it's nature. More on that and on Promises concept can be found on https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Commands-Are-Asynchronous 

```.then()``` method will wait until asynchronous command (promise) is done, and after that will continue with other commands. Until that promise is done, next commands won't be executed. **BUT** Cypress wrapps promises and hides them from us, so there is no need to write *.then()* method after every single step! So we can write our test steps in a synchronous fashion. This is happening if we chain cypress commands. It won't happen if we use no-cypress commands, for example if we store something into a variable, or if we use *.text()* which is a jQuery method, not a cypress command.

Since variables aren't "supported" in Cypres, because of an promise "issues", Cypress has it's own variables concept called "Alias". It is basically the same as creating the variable. Example of this is:<br/>

```cy.get('.products').as('productLocator') // Giving the allias``` 
```cy.get(@productLocator).find('.someClassName').click() // Using the allias```