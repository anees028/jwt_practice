# JWT implementation with NodeJS using MongoDB ⚡️ 
## A clean file structue for Developers!

### Start this project with a following commands.

## 1. Setting up project files
Install the node modules using **npm i** with in a project folder.  
You can setup the mongodb first for setting up the database for storage and using within entire project.

After setting up the db you can add your connection string from MongoDB in the .env file of this project to start and access the database.

After that here are the steps for learning and setting up jwt (Json web token) with whole application.


 
## 2.Model Controller Creation -> 2nd Branch


## 3. Views Generation -> 3rd Branch


## 4. Managing cookies -> 4th Branch

1.1 Store the cookies here in the local storage.
1.2 Install the cookies parser inorder to manage the cookies automatically.   (npm install cookie-parser)


## 5. JWT Implementation -> 5th Branch

In this branch here we are the following steps.
 1. Create the **Age of token** for storing in local storage and cookie. *(authController.js)*
 2. Create the **SECRET_KEY** in the .env file for further usage. *(.env)*
 3. Create method that takes the ID as reponse from db to generate & return the jwt.  *(authController.js)*.



## 6.Error Handling for Views -> 6th Branch

In this branch here we are setting up the validation of form as it doesn't allowed to pass the wrong data to db. 
All these validation is done in the 1 file **views/sign_up.ejs**.
Also the css is applied to show visible errors while rendering. *(public/styles.css)*


## 7. Logging User by comparing jwt stored in db

In this branch here we are setting up the login process by following these steps.
 1. First make a static function named as **Users.statics.login** in *User.js* in user model. *(Users.js)*.
 2. Update the **login_post** method in the *authController.js* for setting up proper login access to the user who is already registered with a valid email.
 3. Login implementation is done by defining a proper errors while email or password not found or matched as already in db.


## 8. Protecting Routes for authentication users
For this protection of routes. We added a **authMiddleware.js** middleware file and made a method for varification of existed token with Secret key. And then it will move to the given url after verification.


## 9. Logout users (By removing cookie)
For logout, we have to remove or replace the cookies by making new get request method.