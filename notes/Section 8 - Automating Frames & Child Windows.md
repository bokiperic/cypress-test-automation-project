# Understanding how to automate Frames & Child windows in Cypress

(test7.cy.js)

## Handling Child Windows with Cypress

There are 2 ways to handle this, since the Cypress doesn't support child windows (neither in child tab nor child window). One way was described in earlier sections - removing the ```target: _blank``` attribute. Other way is to grab the ```href``` attribute containing the URL and open it using the ```cy.visit(url)``` command. Cypress doesn't support cross domain, which means that for the second method if the URL isn't from the same domain as the current page it won't work.

To get the **attribute (property) value** we'll use jQuerry method ```prop()```.

<br/>

(framesDemo.cy.js)

## Handling Frames with Cypress

Frame is HTML document which is embeded in another HTML document. To be able to automate iFrame you'll firstly need to download/install a plugin:

```
npm -D install cypress-iframe
```
After that you'll need to import it: <br/>

```
import 'cypress-iframe'
```

and also add reference to it so you could use it's autosugestions:

 ```
 /// <reference types="cypress-iframe" />
 ```

 In code you'll locate iFrame by using the ```cy.frameLoaded("#iframe_id")``` command. This will load frame into the Cypress object. After that you can switch to that frame by using ```cy.iframe()``` command.

 While executing the **iFrame tests** you won't be able to see screenshots while you hovering over the test steps history. When taking the locators for the elements in iFrame it's better to do that on a separate page opened (same link, just on the other tab) and not inside that iFrame, because some elements you won't be able to find on that way.

If you get *cross-origin* security error the workaround currently, until Cypress fix this, is to copy ```{ chromeWebSecurity: false }``` into the *cypress.config.json* file (only works for Chrome browser):

```
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false
})
```