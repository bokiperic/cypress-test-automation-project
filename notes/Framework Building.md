# Building Cypress Framework

This section will have 5 parts of a building Cypress framework. Those are:

- Building Cypress Framework
  - [Part 1 - Understanding Fixtures and Custom commands](#part-1---understanding-fixtures-and-custom-commands)
  - [Part 2 - Page Object Design and Test Parameterization](#-part-2---page-object-design-and-test-parameterization)

Best practices in building Cypress Framework:
- Setting up test Hooks
- Data driven testing with fixtures
- Building Custom Cypress commands
- Parameterize test with Multiple Data sets
- Understand the test Debugging
- Build Page Object design pattern for objects
- Configuration changes in cypress.json
- Screenshots and Video recording for Test
- Exploring Cypress Dashboard
- Understand the Environmental variables of Cypress
- Generate Excellent reportsfor Test execution results
- Integrate Cypress tests with Jenkins CI
  
 <br/>

## <a name="part-1">Part 1 - Understanding Fixtures and Custom commands</a> 

We can use Hooks presennted by Mocha (https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Hooks). These are helpful to set conditions that you want to run before a set of tests or before each test (it's like anotations in TestNG). Those are ```before```, ```beforeEach```, ```afterEach```, ```after```. 

Useful thing is to driving your test date from external sources. Cypress supports that. If you place your data in ```fixtures``` folder Cypress will automatically have the knowledge about it. Cypress advices us to have separate json files per test cases, so you can create as many jso files as you need. All the fixtures loading is recommended to be written in the *before* hook. In the before hook you call fixtures file using the ```cy.fixtures()``` command:

```
cy.fixture('filename').then(function(data) {
    this.data = data
})
```

You need to input only **filename** as a path, since by default Cypress will look into the *fixtures* folder. Or *sub-folder/filename* if you create folder structure inside the fixtures folder. You'll call the json properties as ```this.data.{propertyName}```.

Custom Cypress comamnds you put inside the ```support``` folder by declaring them inside the ```commands.js``` file. So if you need to create a method you ca create one there and assign a custom command to it, then use that command inside your tests.

<br/>

## <a name="part-2"></a> Part 2 - Page Object Design and Test Parameterization

In JSON file with data you can also put in (key, value) pairing the array od values for a specific key. Iterate through those for example using the ```forEach()```.

#### Test Debugging

There is a command in Cypress where you can pause your test and then continue with running test only if you pass the command to resume. You can put the command ```cy.pause()``` in the part of the code where you wish your test to pause. When you finished debugging and wish to continue runningn the test just click the continue button ("play" icon in the browser running Cypress test).

You can achive the same action using the ```.debug()``` command. For example if you would like to pause/debug after some cy.get command you can type:

```
cy.get("some_selector").debug()
```

You can also use ```console.log``` for debugging. Open it by right-clicking annywhere in the browser running the Cypress test (part of a browser where the website cotent is displayed) and click onn **Inspect element**. From the newly opened tab select **Console**. Basically that is browser's console, but your Cypress logs will also go to the same place because Cypress is acting on your browser.

### Implementing Page Object Design pattern into Cypress

In POD pattern (or POM) we collect all objects from specific page and write themm in a specific class. So if any of the elements/locators will chage in the future, you can update it on only one place ad all the tests will still work, because all test cases should access those elementns from page object classes.

As an example in this project we'll create inside folder ```e2e``` another folder called ```pageObjects```. Insidde this folder we'll create separate JS file for every page we need. Forst oe will be ```HomePage.js```. It will be a class and we declare classes i JS the same way as in JAVA, with addition of ```export default HomePage``` which is needed if we want this class to be available/visible to the rest of our code/project (all other files i the framework):

```
class HomePage {}
export default HomePage;
```

And, of course, you'll need to import it at the start of the file where you want to use it and create the object of that class in that same file, for example:

```
import HomePage from "../pageObjects/homePage"

...

const homePage = new HomePage()
```


