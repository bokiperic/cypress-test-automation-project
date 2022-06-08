# Cypress TestRunner

After installing the Cypress and node_modules, you can run *Cypress TestRunner* by running the command ```node_modules/.bin/cypress open```. <br/>

After this step Cypress will add some folders and example tests to your project. Try running the tests in the ```examples``` folder or add your own test files to ```cypress/integration```.<br/>

Official Cypress documentation with Getting Started Guide can be found at https://docs.cypress.io/guides/getting-started

### Testing Frameworks 
All of these functions come from **Bundled Tools** that Cypress bakes in:
  * ```describe``` and ```it``` come from **Mocha**
  * ```expect``` comes from **Chai**

Cypress builds on these popular tools and frameworks that you *hopefully *already have some familiarity and knowledge of. If not, that's ok too.<br/>

```describe``` can be understanded as **Test Suite**<br/>
```it``` can be understanded as **Test Case**

## Running Cypress tests from the CLI

To run cypress tests from CLI you'll need to prefix each command in order to properly locate the cypress executable. After these commands all tests in the *e2e* folder will be executed. You can use:<br/>

```$(npm bin)/cypress run``` <br/>

... or ... <br/>

```./node_modules/.bin/cypress run```<br/>

... or ... (requires **npm@5.2.0** or greater)<br/>

```npx cypress run``` <br/>

If you would like to run specific test (specs file) use commands with this parameter:<br/>

```cypress run --spec "cypress/e2e/my-spec.cy.js"``` (or "cypress/integration/my-spec.js" depending on the Cypress version)

When you run Cypress through the command line, it will by efault run in **headless** mode, in Electron browser. If y ou would like it to be run in **head** mode run it with this parameter: <br/>

```cypress run --headed``` <br/>

If you would like your tests to be run in specific browser (Electron is by default) use this parameter:<br/>

```cypress run --browser {chrome/firefox/edge}``` 


## Cypress project Framework structure

Some folders are automaticaly created when you start with Cypress project.  <br/>

```fixtures``` - this folder is responsable to store the **test data**. <br/>

```e2e``` - this folder we use to write all our test cases (in earlier versions of cypress it was called ```integration/examples```).<br/>

```plugins``` - plugins in cypress are much like listeners, here we can write code for different events. But, there is a better way for doing that, so we won't be using plugins folder much. <br/>

```support``` - here you can write your customized commands or reusable methods (*support/commands.js* file). For example, if we have some method that is used across multiple test cases, we can create *utility* class here and put that method inside it so it can be automaticaly available to all the test cases. Test case will automaticaly scan *support* folder, even w/o *import* option. <br/>

```videos``` - For every test run Cypress automaticaly takes video and all those are located here. 

```cypress.json``` - There are default Cypress configurations that can be viewed in *TestRunner -> Settings -> Configurations*. You can override those configurations using this file.