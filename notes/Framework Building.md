# Building Cypress Framework

This section will have 5 parts of a building Cypress framework. Those are:

- Building Cypress Framework
  - [Part 1 - Understanding Fixtures and Custom commands](#part-1---understanding-fixtures-and-custom-commands)
  - [Part 2 - Page Object Design and Test Parameterization](#part-2---page-object-design-and-test-parameterization)
  - [Part 3 - Configuration properties & Environmental variables](#part-3---configuration-properties--environmental-variables)
  - [Part 4 - Dashboard features with Video recording & Screenshots](#part-4---dashboard-features-with-video-recording--screenshots)

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

## <a name="part-2">Part 2 - Page Object Design and Test Parameterization</a>

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

<br/>

## <a name="part-3">Part 3 - Configuration properties & Environmental variables</a>

Implementing global configuration changes to Cypress framework can be done inside the ```cypress.config.js``` file. But, if you would like to cofigure only for a specific test/file you can use command ```Cypress.config('configurationYouWishToChange', value)``` inside that test/file, for example:

```
Cypress.config('defaultCommadTimeout', 5000)
```

Good practice is to be consistent and have 1 global configuration, but in some specific cases you may need to configure something local, too.

In order to take just part of the string you need (for example, you need 10000 from the string "$ 1000") you can use JS ```.split()``` method. This code will split the strig by using the white space as a string separation marker:

```
stringVariable.split(" ")
```

After split is done, the variable that contains new splited string will be ab array where every index will have one part of the split string. In our example case it will have string "$" at index 0, and "1000" at index 1. To remove any spaces that may have left after splitting, use the JS ```.trim()``` method:

```
splitStrigVariable[0].trim()
```

Converting a String number value in number in JS can be done as: ```Number(stringNumberValue)```.

Cypress commands will wait to finish before the new one is started. JS commands won't, since JS is asychronous. These you must solve using the promices (```.then(function() {...})```).

#### Environmental Variables in Cypress

These are the variables that are globally declared for your framework so that they will have access to each and every test case. You can call them either ```environmental``` or ```global``` variables. One of the example are URLs. Basically all data that is specific for the environment. You'll usually have environments like ```QA```, ```DEV```, ```PROD```, etc.

If you wish to change some global variables defined by Cypress you can do it in ```cypress.config.json``` file. YOu can findd these commands by opening the Cypress Dashboard (from where you can run tests on click) and going to tab ```Settings```. For variables that are nor Cypress variables you first need to put type a key and in that sub-JSON you can type variables. For example:

```
{
  "defaultCommandTimeout": 8000, // cypress global variable
  "env":                  // global variable for "env" environment
  {
    "url": "someurl.com"
  }
}
```

Then you call it in test like:
```
cy.visit(Cypress.env('url'))
```

Or if you have only base URL in global variable you can concatinate subdomains inside the specific tests:

```
cy.visit(Cypress.env('baseUrl') + "/sub-domain/")
```

You can also, for example, set the URL from terminal while executing the cypress run command. By running it from the terminal that URL will override the one from the cypress.config.js file! Example:

```
node_modules\.bin\cypress run --spec cypress/integration/examples/testName.cy.js --env url=https://someurl.com --headed
```

This comamnd will run only that specific spec and will use the URL we provided in that same command. We put ```--headed``` becausee Cypress by default will be run in headless mode and here we would like it to be run in headed mode.

Cypress will automatically, out of the box, capture ```Screenshots``` on the test failure and inform you where that screenshot is located.

Good practive in Cypress is to locate your POM files inside ```support``` folder. This is because if those are in the same folder as tour tests, Cypress will inform you regularly that those are not test cases. So inside the support folder create ```pageObjects``` folder (or some other name) and put your "Page" files there.

<br/>

## <a name="part-4">Part 4 - Dashboard features with Video recording & Screenshots</a>

Official documetation about Cypress Dashboard can be found at https://docs.cypress.io/guides/dashboard/introduction. When you trigger your test cases you can see the results on Dashboard (Cloud Server), and in the same time you can see recording of each and every test as well as reporting, videos and screenshots. 

You can see these runs locally in Cypress runner (```npx cypress open```) in it's ```Runs``` tab. When you start it for the first time, you'll need to login (best is to use **GitHub** or **Google** account you already have) annd after that you'll need to setup your project. Basicaly, for project setup just follow the flow, it's more like "Next, Next, Next" flow. After that your project will get it's own ```projectId``` and you'll get the command which you can run locally from your *cypress* folder in order for the tests to be displayed on Cypress Dashboard (```cypress run --record --key {projectKey}```). This *projectKey* is not the same value as the *projectId*.

### Monitoring Test Execution through Cypress Dashboard

