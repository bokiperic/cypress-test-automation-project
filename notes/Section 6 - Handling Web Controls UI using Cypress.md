# Handling Web Controls UI using Cypress

## Check boxes

For checkboxes there is specific method ```.check()``` and ```.uncheck()```. You can still use *.click()*, but this one is better and more "professional".<br/>

When you are validating properties of check boxes, then you will validated it as ```should('have.some property')```, but if you have behavior like when you would like to check if the check box is checked or not you'll use ```should('be.checked')```.<br/>

In Cypress you can have more thatn ona assetrion in the same line, there is no need to repeat the same code that was before the assertion. Just innstead the second *should* you'll use *and* For example this is valid code with 2 assertions in the same line:<br/>

```cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')```

You can also select all check boxes on the page if you find identifier that will take all of them, and then to select to check only some of them. For example:<br/>

```cy.get('input[type="checkbox"]').check(['option2', 'option3'])```

where ```input[type="checkbox"]``` will select all the checkboxes on the page, and ```.check()``` method with parameters will check only on some of them. These parameters need to be *value* properties.

Exactly the same concept is for the ```radio buttons```!

## Static Dropdowns

If the dropdown is *static* by default, then the tagname in HTML code for it will be ```select```. These ropdowns open when we click on them and we need to select one of the displayed options, so that's why they are called *static*.

To select dropdown you can use ```.select()``` where you as argument can pass either **option name (text)** or **value attribute of the option (value="valueName")**. Example:<br/>

```cy.get('select').select('option2')```

## Dynamic Dropdowns

Dynamic dropdowns are basically text fields where when you start typing you'll get options to select, something like search fields. 

When you type text and get the options to select, trying to 'spy' on those in order to get selector results in loosing all the options. Resolution is to do a right-click on option you would like to select and select 'Inspect' from the menu. In order to select an option you'll need to write a generic locator, which means to grab all the options that display and cycle through them in order to find which one we need to select. Example: <br/>

```
cy.get('#autocomplete').type('ind')
    cy.get('.ui-menu-item div').each(($el, index, $list) => { // each() method will automatically resolve promise
        if($el.text() === 'India') {
            cy.wrap($el).click()
        }
    })
```


