# Building Cypress Framework

This section will have 6 parts of a building Cypress framework. Those are:

- Building Cypress Framework
  - [Part 1 - Understanding Fixtures and Custom commands](#part-1---understanding-fixtures-and-custom-commands)
  - [Part 2 - Page Object Design and Test Parameterization](#part-2---page-object-design-and-test-parameterization)
  - [Part 3 - Configuration properties & Environmental variables](#part-3---configuration-properties--environmental-variables)
  - [Part 4 - Dashboard features with Video recording & Screenshots](#part-4---dashboard-features-with-video-recording--screenshots)
  - [Part 5 - Building npm Scripts and Integration with Jenkins](#part-5---building-npm-scripts-and-integration-with-jenkins)
  - [Part 6 - Cypress BDD Cucumber Framework integration to Mocha](#part-6---ccypress-bdd-cucumber-framework-integration-to-mocha)

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
- Adding BDD Cucumber framework to Mocha
  
 <br/>

## <a name="part-1">Part 1 - Understanding Fixtures and Custom commands</a> 

We can use Hooks presennted by Mocha (https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Hooks). These are helpful to set conditions that you want to run before a set of tests or before each test (it's like anotations in TestNG). Those are ```before```, ```beforeEach```, ```afterEach```, ```after```. 

Useful thing is to driving your test data from external sources. Cypress supports that. If you place your data in ```fixtures``` folder Cypress will automatically have the knowledge about it. Cypress advices us to have separate json files per test cases, so you can create as many json files as you need. All the fixtures loading is recommended to be written in the *before* hook. In the before hook you call fixtures file using the ```cy.fixtures()``` command:

```
cy.fixture('filename').then(function(data) {
    this.data = data
})
```

You need to input only **filename** as a path, since by default Cypress will look into the *fixtures* folder. Or *sub-folder/filename* if you create folder structure inside the fixtures folder. You'll call the json properties as ```this.data.{propertyName}```.

Custom Cypress commands you put inside the ```support``` folder by declaring them inside the ```commands.js``` file. So if you need to create a method you can create one there and assign a custom command to it, then use that command inside your tests.

<br/>

## <a name="part-2">Part 2 - Page Object Design and Test Parameterization</a>

In JSON file with data you can also put in (key, value) pairing the array od values for a specific key. Iterate through those for example using the ```forEach()```.

#### Test Debugging

There is a command in Cypress where you can pause your test and then continue with running test only if you pass the command to resume. You can put the command ```cy.pause()``` in the part of the code where you wish your test to pause. When you finished debugging and wish to continue running the test just click the continue button ("play" icon in the browser running Cypress test).

You can achive the same action using the ```.debug()``` command. For example if you would like to pause/debug after some cy.get command you can type:

```
cy.get("some_selector").debug()
```

You can also use ```console.log``` for debugging. Open it by right-clicking anywhere in the browser running the Cypress test (part of a browser where the website content is displayed) and click on **Inspect element**. From the newly opened tab select **Console**. Basically that is browser's console, but your Cypress logs will also go to the same place because Cypress is acting on your browser.

### Implementing Page Object Design pattern into Cypress

In POD pattern (or POM) we collect all objects from specific page and write them in a specific class. So if any of the elements/locators will change in the future, you can update it on only one place and all the tests will still work, because all test cases should access those elements from page object classes.

As an example in this project we'll create inside folder ```e2e``` another folder called ```pageObjects```. Inside this folder we'll create separate JS file for every page we need. First one will be ```HomePage.js```. It will be a class and we declare classes i JS the same way as in JAVA, with addition of ```export default HomePage``` which is needed if we want this class to be available/visible to the rest of our code/project (all other files in the framework):

```
class HomePage {}
export default HomePage;
```

And, of course, you'll need to import it at the start of the file where you want to use it and create the object of that class in that same file, for example:

```
import HomePage from "../pageObjects/HomePage"

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

In order to take just part of the string you need (for example, you need 1000 from the string "$ 1000") you can use JS ```.split()``` method. This code will split the string by using the white space as a string separation marker:

```
stringVariable.split(" ")
```

After split is done, the variable that contains new splited string will be an array where every index will have one part of the split string. In our example case it will have string "$" at index 0, and "1000" at index 1. To remove any spaces that may have left after splitting, use the JS ```.trim()``` method:

```
splitStrigVariable[0].trim()
```

Converting a String number value in number in JS can be done as: ```Number(stringNumberValue)```.

Cypress commands will wait to finish before the new one is started. JS commands won't, since JS is asychronous. These you must solve using the promices (```.then(function() {...})```).

#### Environmental Variables in Cypress

These are the variables that are globally declared for your framework so that they will have access to each and every test case. You can call them either ```environmental``` or ```global``` variables. One of the example are URLs. Basically all data that is specific for the environment. You'll usually have environments like ```QA```, ```DEV```, ```PROD```, etc.

If you wish to change some global variables defined by Cypress you can do it in ```cypress.config.json``` file. You can find these commands by opening the Cypress Dashboard (from where you can run tests on click) and going to tab ```Settings```. For variables that are not Cypress variables you first need to put type a key and in that sub-JSON you can type variables. For example:

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

This command will run only that specific spec and will use the URL we provided in that same command. We put ```--headed``` becausee Cypress by default will be run in headless mode and here we would like it to be run in headed mode.

Cypress will automatically, out of the box, capture ```Screenshots``` on the test failure and inform you where that screenshot is located.

Good practice in Cypress is to locate your POM files inside ```support``` folder. This is because if those are in the same folder as your tests, Cypress will inform you regularly that those are not test cases. So inside the support folder create ```pageObjects``` folder (or some other name) and put your "Page" files there.

<br/>

## <a name="part-4">Part 4 - Dashboard features with Video recording & Screenshots</a>

Official documetation about Cypress Dashboard can be found at https://docs.cypress.io/guides/dashboard/introduction. When you trigger your test cases you can see the results on Dashboard (Cloud Server), and in the same time you can see recording of each and every test as well as reporting, videos and screenshots. 

You can see these runs locally in Cypress runner (```npx cypress open```) in it's ```Runs``` tab. When you start it for the first time, you'll need to login (best is to use **GitHub** or **Google** account you already have) and after that you'll need to setup your project. Basicaly, for project setup just follow the flow, it's more like "Next, Next, Next" flow. After that your project will get it's own ```projectId``` and you'll get the command which you can run locally from your *cypress* folder in order for the tests to be displayed on Cypress Dashboard (```cypress run --record --key {projectKey}```). This *projectKey* is not the same value as the *projectId*.

### Monitoring Test Execution Videos & Screenshots through Cypress Dashboard

In the Dashboard you can see for example all the logs of all the tests that failed. Also you can check the screenshot on the exact step where the test failed. One more thing is the recorded video of the complete test run. All these are available w/o any additional code in your test or framework. Performance and useful data of your tests or/and application can be checked in **Analytics** sections.

### Rerun failed tests with Cypress retries configuration

To setup this open the Cypress Run and go to ```Settings -> Project settings``` and after scrolling down you'll find property ```retries.runMode```. This number defines how many times test will be rerun ater it fails. By default this value is 0, so failed tests won't be rerunRecomendation is to put it to 1, but if your application is non so stable then you should put even bigger number: 

```
retries: {
  runMode: 0,
  openMode: 0,
}
```

</br>

## <a name="part-5">Part 5 - Building npm Scripts and Integration with Jenkins </a>

In ```package.json``` file there is a part named ```scripts``` where you can write the whole script and give it a name/allias. For example:

```
"scripts": {
    "test": "npx cypress run"
  }
```
Now if we run in command line command ```npm run test``` the script for the "test" allias will run, in this case that is ```npx cypress run```. Here ***test*** is the name of the script, that name we specify after the *npm run* command in commannd line. Here you cann write all the commands that you need.

### Integrating Cypress with Jenkins

1. Create new project in Jenkins - ```New Item```, select a project name, and choose Free flow.
2. Select GIT as a ```Source Code Management``` or, if the code is local, select ```Use custom workspace``` and add a local path to the project.
3. In order to send Cypress commannds to Jenkins check the ```This project is parametrized``` checkbox. Give it a namem and in the **Choices** section paste the names of all the scripts you would like to be able to use and click **Save**.
4. Go to ```Build with parameters``` section, from a dropdown menu select script you would like to run and click **Build** to do a build
5. Go to ```Configure -> Build Steps -> Add build step``` and select ```Execute shell```, because npm will work better with shell window. As *Command* type ```npm run "$Script"```, so the selected script could run.

</br>

## <a name="part-6">Part 6 - Cypress BDD Cucumber Framework integration to Mocha</a>

Installation of the Cucumber plugin, with the instractions, can be found on: [https://github.com/badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor). By default Cypress doesn't support Cucumber related runs. You install it by:

1. Running this command in your project's folder:

```
npm install @badeball/cypress-cucumber-preprocessor
npm install --save-dev @cypress/browserify-preprocessor
```

2. After installation you need to register the newly installed plugin in the *cypress.config.js* file ```setupNodeEvents``` function. This function helps you to load all the plugins before you start running your tests. You eed to add these 2 lines of code inside and also you can move that function on top of your cypress.config.js file, above ```module.export``` line, so the code would look more clean, like this:

```
async function setupNodeEvents(on, config) {
  // implement node event listeners here
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));
  return config;
}
```
and then just run in inside the *e2e* section:

```
e2e: {
    setupNodeEvents,
    specPattern: 'cypress/integration/examples/*.js'
  }
```
Additionaly, you need to imporpt those 2 in that same file:

```
const preprocessor = require('@badeball/cypress-cucumber-preprocessor')
const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify')
```
3. Check that in ```package.json``` file you have both of these in *dependencies* section:

```
"dependencies": {
    "@badeball/cypress-cucumber-preprocessor": "^18.0.1",
  }
```
and **devDependencies**:

```
"devDependencies": {
    "@cypress/browserify-preprocessor": "^3.0.2",
    "cypress": "^10.10.0",
  }
```

4. In order for Cypress to run the BDD Cucumber ```feature``` files, we'll forstly create a **BDD** folder, for example inside the *examples* folder (or inside the 'integration' folder which you can create instead of the 'examples' for the real-life project), and add that path to the *e2e* section of the ```cypress.config.js``` file:

```
e2e: {
    setupNodeEvents,

    // 'specPattern' for the Framework w/o BDD
    // specPattern: 'cypress/e2e/examples/*.js'

    // 'specPattern' for the Framework WITH BDD
    specPattern: 'cypress/e2e/examples/BDD/*.feature'
  },
```

To have syntacs highlighting for your feature files download a VS Code plugin ```Cucumber (Gherkin) Full Support```. Process of writting the tests would be:

1. In **BDD** folder you create ```.feature``` file with scenario(s)
2. Inside *BDD* folder create folder for writing the code that will connect with this feature file (in this framework example it is 'ecommerce' folder). Name of this folder needs to be the same as the ame of the feature file, since it will first try to find the code inn the folder of that name
3. In that folder create JS file of any name and write step definitions for feature file inside it

### Data driven testing with Cucumber

Instead relying on Cypress fixtures you can also do it with Cucumber (data driven testing). Advice is to rely on Cypress and ot complicate too much, but here we'll also show this way, using the Cucumber. This is done in part of BDD code where we are testing filling the form (second eCommerce test). You can add data inside the feature file in nthe section where you will use it, like this:

```
Scenario: Filling the form to shop
        Given I open Ecommerce page
        When I fill the form details
            |name | gender |
            |bob  | male   |
        Then Validate the form's behavior
        And Select the Shop Page
```
And then update in the code with adding the *dataTable* argument inside the function but also inside the part where you are doing the assertion:

```
When('I fill the form details', function(dataTable) {
    homePage.getEditBox().type(dataTable.rawTable[1][0])
    homePage.getGender().select(dataTable.rawTable[1][1])
})
```

If you would like to keep the fextures way of working with data, just create ```beforeEach.js``` file inside the folder where the code for step definitions is located and move the fixtures loading data code there, like this:

```
beforeEach( () => {
    cy.fixture('userFormData').then(function(data) {
        this.data=data
    })
});
```

###Tagging

You can tag your tests, so you could run only the ones with the specific tag. You enter the tag above the sceario like this:

```
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
        |bob  | male   |
    Then Validate the form's behavior
    And Select the Shop Page
```

Here ```@Regression``` and ```@Smoke``` are tags, and if you would like to run for example only scenarios that have ```@Regression``` tag in headed mode and inside the Chrome browser, you could do that using the command:

```
npx cypress run --env tags="@Regression" --headed --browser chrome
```

### Cucumber HTML Report

To generate Cucumber Report two steps are required:
1. To generate test results in the JSON format
2. Cucumber will convert those results from JSON to HTML report

You can check this also on [https://github.com/badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor), if you go to Documentatio, then select Reports section and follow the steps.

 For the **Step 1** you need to download and install [cucumber-json-formatter](https://github.com/cucumber/json-formatter) ("copy to PATH" part means to copy it to the project main directory) and also enable JSON reports. TO enable JSON reports go to ```package.json``` and add this section (for example between "scripts" and "repository" sections):

 ```
 "cypress-cucumber-preprocessor": 
  {
    "json": {
      "enabled": true,
      "output": "folderLocation" - this property is optional
    }
  }
 ```
 The report is outputed as ```cucumber-report.json``` in the project directory, but can be connfigured through the ```json.output``` property.

 For the **Step 2** you need to download plugin [Multiple Cucumber HTML Reporter](https://npmjs.com/package/multiple-cucumber-html-reporter). You also need to create one file and locate it inside the project main folder. The file can be found on the Multiple Cucumber HTML Reporter's page, just copy-paste the code to the newly created file. This file is a script that will do the convertion from JSON to HTML and generate the HTML report. In nthis framework it is the ```cucumber-html-report.js``` file. Now you only need to execute this file and it will automaticaly generate a HTML report for you. You can execute it usinng the *node* command: ```node cucumber-html-report.js```.