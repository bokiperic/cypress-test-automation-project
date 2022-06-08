# Cypress Step by Step installation
 
 ## Step 1:
 Download and install Node.js, either by visiting the URL: https://nodejs.org/en/download and starting the GUI setup or by using the *Homebrew* (this will install both **node.js** and **npm**). <br/> 
 
 Update PATH variable as suggested at the end of the GUI installation. <br/> 
 
 #### Mac:
 ```nano ~/.bash_profile``` <br/>

 add ```export PATH=$PATH:/usr/local/bin```<br/> 
 
and after that: ```source ~/.bash_profile``` to update it's content. <br/>

#### Win:
Find the instalation path of *node.js* and copy the whole path. Then right click on *My PC*, go to *Advanced* tab and click on *Environment Variables*. Here click on *New* and add something like *NODE_HOME* and paste the path you just copied.

## Step 2:
Download and install IDE you prefer for writing the JS code, for example *Visual Studio Code*, *IntelliJ IDEA*.

## Step 3:
Create a new project and inside the project create  ```package.json``` inside your IDE. Best to do is to use the command ```npm -i init``` and go through all the steps, clicking ENTER for any parameter you don't want or not sure if you should change. After that anyone who gets this project/folder can just run ```npm install``` and besides the default *node_modules* folder all packages from *package.json* will be installed, too.

## Step 4:
Install Cypress by going to your newly created project's folder in the terminal and running the command ```npm install cypress --save-dev```. This will install Cypress locally as a dev dependency for your project. **IMPORTANT:** Make sure that you have already run ```npm init``` or have a ```node_modules``` folder or ```package.json``` file in the root of your project to ensure cypress is installed in the correct directory.