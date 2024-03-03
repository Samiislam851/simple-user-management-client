# User Atlas
The project is a simple user management dashboard that allows administrators to perform various user management tasks.

##### Table of Contents
- [User Atlas](#user-atlas)
        - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Installation](#installation)
  - [Usage](#usage)
  - [ScreenShots](#screenshots)
  - [Live-link](#live-link)


 ## Introduction 

 This project includes features such as user registration, login, viewing user details, editing user information,The application also includes authentication using JSON Web Tokens (JWT) to ensure secure access to user data.
 which will be talked briefly later in this documentation.

 ## Features 
  
  Some key features include:

  * Implementation of JWT for each api request after logging in through axios
  
  * Protected routes to prevent unauthorized access
  
  * Usage of firebase for monitoring AuthState of user
  
  * LogOut for api requests when there is no JWT token given
  
    ### In-app features :
     
     *  Registration and login for admin
     *  Adding User
     *  Editing user details
     *  Blocking / Unblocking Deleting users
     *  Viewing all of the users
     *  Mobile responsive UI 

## Technologies  
 Technologies used in this application are: 
  1. ###Client
     * React-vite
     * React-router
     * Firebase
     * Typescript
     * Axios
     * SweetAlert

  2. ###Server
     * Node 
     * Express
     * MongoDB
     * Mongoose
     * JWT


## Installation
   To run the project locally, follow these steps:

1. Clone the repository 
     ````
     git clone <repository-url>
     ````
2.   Navigate to the project directory:
      ````
     cd <repository-name>
     ````
3.   Install dependencies:

     ````
     npm install
     ````
4. Start the development server:

     ````
     npm run dev
     ````
5. Give env variables in .env.local file
    * `firebase credentials`  

6.  Open your browser and navigate to:
   ` http://localhost:5173` to view the application.   

## ScreenShots
   Here are some snapshots of the application
  1. ### Login Page
       <img src="https://i.ibb.co/LSvhP7d/loginpage.png" alt="login" width="500px" />

  2. ### Home Page
     <img src="https://i.ibb.co/fQ9z5Fw/HomePage.png" alt="Home" width="500px" />

  3. ### Create User Page
      <img src="https://i.ibb.co/8c1FV09/Create-User.png" alt="Create" width="500px" />

  4. ### Show Users Page
      <img src="https://i.ibb.co/QY2yF8d/Show-Users.png" alt="Show" width="500px" />

  5. ### User Details/Edit Page
      <img src="https://i.ibb.co/q0f6zyh/User-details.png" alt="User" width="500px" />

  6. ### Notification
      <img src="https://i.ibb.co/Y2rtbqw/notification.png" alt="Notification" width="500px" />


## Server-repository Link
   [click here for the server-side repository](https://github.com/Samiislam851/simple-user-management-dashboard-server)

## Live-link
   [click here for live preview](https://user-atlas.vercel.app/)
