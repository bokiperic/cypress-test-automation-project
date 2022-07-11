# Advanced Automation - Handling Alerts, Popups, Child Windows using Cypress-jQuery

(test4.cy.js)

## Alerts

Cypress is designed that if a popup/alert pops up, it will automatically click OK button and close it. But, Cypress also has a capability to listen to the browser events. That means that there is, for example, a windows event 'alert triggered' in your browser when any alert is opened (```window:alert```). From Cypress you can trigger this event (because Cypress has the power to manipulate & take control of your DOM), that popup will be captured and then you can, for example, get the text presented on the alert. For triggering an event Cypress uses command ```.on('eventName',(browserResponse) => {})```. It will trigger the event, but you won't see anything on the screen. More on events triggering can be found on https://docs.cypress.io/api/events/catalog-of-events.html. See some examples in file *test4.cy.js*. <br/>

## Child tabs

**Child tabs** - when new page opens in the new tab (```target="_blank"```). Cypress doesn't have any knowledge on child tabs, but there are few workarounds for that. What Cypress guys are advising is to use these steps:<br/>
* Put assertion on the ```target="_blank"``` attribute to check if the page will open in the new tab
* If it is present then open it in the current browser tab instead in the new one

How to do the second one? Cypress has the ability to manipulate the DOM. In order to do this we will introduce new method ```invoke``` - it will invoke the function on the previously yielded subject. It will help us to invoke jQuery functions. We need jQuery because there is a function called ```removeAttr()``` in jQuery that we we'll use for this. <br/>

Syntax:<br/>
```
.invoke(functionName)
.invoke(functionName, args...)
```
Example:<br/>
```
cy.get('#opentab').invoke('removeAttr', 'target').click()
```

This ```click()``` method will open link in the same tab/page, because this attribut was removed using the invoke/removeAttr combo.

## Navigating browser controls

For this we'll use Cypress command ```go``` - navigate back or forward to the previous or next URL in the browser's history. <br/>

Syntax:<br/>
```
cy.go(direction)
cy.go(direction, options)
```

Example:<br/>
```
cy.go('back')
cy.go('forward')
```

## Validate URL

You can retrieve URL using the Cypress ```url``` command - get the current URL of the page that is currently active.<br/>

Syntax:<br/>
```
cy.url()
cy.url(options)
```

Example:<br/>
```
cy.url().should('include', 'rahulshettyacademy')
```
<br/>

(test5.cy.js)

## Handling web tables

To select for example second column in all table rows using the css seleector we would use: <br/>
```tr td:nth-child(2)```
<br/>

If you would need not a child, but a sibling (for example you catch one row and you would like to catch next row of the same column) you ca use ```next``` command, since it gets the immediately following simblingof each DOM element within a set of DOM elements. Example Video No.36, around 12th minute.

```
cy.get('av a:first').next() // Yield next linnk i nav
```

```
cy.get('li').next('.selected') // Yields <li>pineapples</li>
```

This is the jQuerry promice, so after ```.next()``` we usually use ```.then()```. Also, it works only on ```cy.get()```.

<br/>

(test6.cy.js)

## Handling mouse hover popups using Cypress

When designing Cypress they thought mouse hover would result in flaky tests, so they didn't want to support this. So again for this we'll use help of the jQuerry. For displaying the menun o mouse hover we'll use jQuerry method ```show()```. It is used to display the hidden and selected elemets. This method display hidden elements which are using **CSS** ```display: none``` property.

```
cy.get('div .mouse-hover-content').invoke('show')
```

Show method should be applied on immediate Parent of hidden element.
<br/>

Cypress is able to click o hidden elements. It can bring the hidden elemennt in visible mode using the argument ```click({force: true})``` to the ```click()``` method.

```
cy.get('button').click({force: true})
```
or

```
cy.get('button').click('bottomLeft', { force: true} )
```
<br/>

So in Cypress you can either use jQuerry method ```show()``` to open hidden onHover menu and dclick it regularly OR you can use ```click({force; true})``` to just click hiden element w/o opening the onHover menu.

