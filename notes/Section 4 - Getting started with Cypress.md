# Getting started with Cypress Test Automation

Basic locators and assertions stuff. Handling invisible elements by understanding logs.

## Cypress locator strategies and how to construct them

Cypress supports **ONLY** *CSS selectors*. You can construct CSS selectors on many different ways, depending what data you have/find. For example:

* As ```#idname``` if you have the element  *id*
* As ```.classname``` if you have the element *classname*
* As ```tagname.classname``` when multiple elements have the same *classname* and you want/can to uniquely identify that element
* Also as ```tagname#idname``` when multiple elements have the same *id* (which idealy shouldn't be the situation) and you want/can to uniquely identify that element
* As customized with any attribute - ```tagname[attribute=value]``` if you don't have neither id nor classname, so need to use some other attribute (*tagname* is optional, if there are more than 1 element with same attribute value). For example -> *input[type='search']*
* Going from ```parent to child``` as *tagnames* with whitespace between them, for example -> *form input* if the input field/tag is the child of the form.

As a help you can download ```ChroPath``` plugin for CHrome and Firefox and install it. Then search for ```CSS selector``` in it's dropdown option to find locator OR you can type css selector you have just to check if it is found and unique. <br/>

You can also use TestRunner for finding the selectors. After tests is run click on ```Open Selector Playground``` icon.

To enable code completition for cypress, go to https://docs.cypress.io/guides/tooling/intelligent-code-completition.html#Set-up-in-your-Dev-Environment and you'll find there that you need to add ```/// <reference types="Cypress" />``` into your specs file (on top of it).

In Cypress for the String you can use both single and double quotes.

Cypress will wait automaticaly if there is any clue on the page that the page is loading. If there is none of the clues, we need to add ```cy.wait()``` command, which is the Cypress' way of *thread.sleep()*

Scratched eye icon in the "timeline" section of the cypress run tests informs us there are some hidden elements on the screen. To enclude only visible elements in your tests just add ```:visible``` after class/id name in your css selector.
