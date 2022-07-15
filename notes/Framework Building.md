# Building Cypress Framework

This section will have 5 parts of a building Cypress framework. Those are:

* [Part 1 - Understanding Fixtures and Custom command](#part-1)
* [Part 2 - Page Object Design and Test Parameterization](#part-2)
* [Part 3 - Configuration properties & Environmental variables](#part-3)
* [Part 4 - Dashboard feature with Video recording & Screenshots](#part-4)
* [Part 5 - Building npm Scripts and Integration to Jenkins](#part-5)

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


## <a name="part-1"></a> Part 1 - Understanding Fixtures and Custom commands

We can use Hooks presennted by Mocha (https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Hooks). These are helpful to set conditions that you want to run before a set of tests or before each test (it's like anotations in TestNG). Those are ```before```, ```beforeEach```, ```afterEach```, ```after```. 

Useful thing is to driving your test date from external sources. Cypress supports that. If you place your data in ```fixtures``` folder Cypress will automatically have the knowledge about it. Cypress advices us to have separate json files per test cases, so you can create as many jso files as you need. All the fixtures loading is recommended to be written in the *before* hook. In the before hook you call fixtures file using the ```cy.fixtures()``` command:

```
cy.fixture('filename').then(function(data) {
    this.data = data
})
```

You need to input only **filename** as a path, since by default Cypress will look into the *fixtures* folder. Or *sub-folder/filename* if you create folder structure inside the fixtures folder. You'll call the json properties as ```this.data.{propertyName}```.

Custom Cypress comamnds you put inside the ```support``` folder by declaring them inside the ```commands.js``` file. So if you need to create a method you ca create one there and assign a custom command to it, then use that command inside your tests.