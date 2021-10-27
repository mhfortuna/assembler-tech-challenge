`#html` `#css` `#js` `#react`  `#node`  `#master-in-software-engineering` `#firebase` `#express` `#mongoDB` `#monorepo`
# Assembler tech challenge 👨‍💻<!-- omit in toc -->
This project is a GIF platform to share and share GIFs or Memes developed in less than two days. 

It is fully deployed in heroku and you can test it going to [assembler-tech-challenge.herokuapp.com](https://assembler-tech-challenge.herokuapp.com/)

It uses *Firebase* for authentication and file storage, *Mongo Atlas* for the data base and *Giphy* as a third party API to fill the page with more content. This is a monorepo for both frontend and backend.

# Table of contents <!-- omit in toc -->
- [Project requirements](#project-requirements)
    - [Requirements:](#requirements)
- [🚀 Getting Started](#-getting-started)
  - [Requirements 📋](#requirements-)
  - [Installation 🔧](#installation-)
- [🦴 Project Structure](#-project-structure)
  - [Folder structure 🗂](#folder-structure-)
  - [Deployment 🛫](#deployment-)
  - [User views 👩‍💻](#user-views-)
- [🕵️‍♂️ Resources](#️️-resources)
  - [Main resources 🧬](#main-resources-)
  - [Support libraries 📚](#support-libraries-)
  - [Wishlist ✨](#wishlist-)

# Project requirements
The  **main functionalities**  are detailed below:

-   **Login**  and  **registration**
-   **Home page**  that will show the  **content uploaded**  by users
-   **Main Navbar**  that will include:
    -   **Content search bar**:
        -   You will have at least  **three options**  to filter the  **main content**
    -   **Links**  to the  **main categories**
    -   **Information**  of the  **logged in user**
        -   If you are not logged in, the  **button**  to log in will be  **displayed**
-   **Upload content page**
    -   If the user is logged in, a  **multimedia resource**  can be  **uploaded**  from their  **computer**  or from a an  **external link**
-   **Page**  of the  **selected multimedia**  element:
    -   The  **user can obtain the link**  of the  **multimedia resource**  to include it on any  **website**

### Requirements:
-   Use at least  **one third-party API**
-   Use at least  **one third-party library**
-   Creation of your own  **database**  to  **store**  all the  **information**
-   **Anyone can access the website**  and  **view**  the  **content**  of other  **users**, but only  **previously registered**  users  **can upload multimedia content**


# 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Requirements 📋

You need to have [NodeJs](https://nodejs.org/) installed to run the backend .
Install Yarn globally: `npm install --global yarn` 
Once you have installed these programs, you need to create accounts for: - [Firebase](https://firebase.google.com/) - [MongoDB Atlas](https://www.mongodb.com/)

## Installation 🔧

First, you will need to `clone` or `fork` the repository into your Github account:

<img src="https://docs.github.com/assets/images/help/repository/fork_button.jpg" alt="Fork on GitHub" width='450'>

`$ git clone https://github.com/mhfortuna/assembler-tech-challenge`

Then run yarn install in the base folder `yarn install`

When you have all the dependencies installed you need to create two .env files, one located in client folder and one in server folder.

The client .env file need to contain the next variables:

```
REACT_APP_FB_API_KEY  # use the firebase variables here
REACT_APP_FB_APP_ID
REACT_APP_FB_AUTH_DOMAIN
REACT_APP_FB_MSG_SENDER_ID
REACT_APP_FB_PROJECT_ID
REACT_APP_FB_STORAGE_BUCKET
REACT_APP_BACKEND_API_ROUTE = http://localhost:4000/api
```

The server .env file need to contain the next variables:

```
# Mongo settings
MONGO_DB_URL = Your MongoDB Atlas connection url 

# Server settings
PORT = 4000

# Firebase settings
FB_CERT_TYPE = Your FireBase cert type
FB_CERT_PROJECT_ID = Your FireBase project id
FB_CERT_PRIVATE_KEY_ID = Your FireBase private key id
FB_CERT_PRIVATE_KEY = Your FireBase private key
FB_CERT_CLIENT_EMAIL = Your FireBase client email
FB_CERT_CLIENT_ID = Your FireBase client id
FB_CERT_AUTH_URI = Your FireBase Auth uri
FB_CERT_TOKEN_URI = Your FireBase token uri
FB_CERT_AUTH_PROVIDER_X_509_CERT_URL = Your FireBase cert auth provider x 509 cert url FB_CERT_CLIENT_X_509_CERT_URL = Your FireBase cert client x 509 cert url

# Giphy settings
GIPHY_API_KEY= Your Giphy API Key
```

# 🦴 Project Structure

## Folder structure 🗂

<pre>  
└───packages 	<i>// Monorepo workspaces</i>  
    ├───client	<i>// Frontend React App</i>  
    │   ├───public
    │   └───src
    │       ├───api	<i>// All api petitions</i>  
    │       ├───assets
    │       ├───components
    │       ├───constants
    │       ├───pages
    │       │   └───Public	<i>// Because this views are user accesible</i>  
    │       ├───redux
    │       ├───sass
    │       ├───services	<i>// 3rd party services used</i>  
    │       └───utils	<i>// Reusable code snippets </i>  
    └───server	<i>// Backend Node Server</i>  
        └───src
            ├───config
            ├───controllers
            ├───db
            ├───middlewares
            ├───models
            ├───routes
            └───services
                ├───firebase
                └───giphy
</pre>


## Deployment 🛫

For the deploy of this application [Heroku](www.heroku.com) was used for the backend and frontend.

During the development phase CI/CD was implemented on main branches to test on a real scenario.


## User views 👩‍💻

- Home Page
- Category page (one for each category)
- NotFound: Page for 404 errors
- Search
- Sign in
- Sign up
- Gif/meme view
- Upload content


# 🕵️‍♂️ Resources

## Main resources 🧬

- [Axios](https://axios-http.com/docs/intro)
- [Bootstrap](https://getbootstrap.com/)
- [Eslint](https://eslint.org/)
- [Express](https://expressjs.com/)
- [Firebase](https://firebase.google.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Node JS](https://nodejs.org/)
- [Prettier](https://prettier.io/)
- [React](https://es.reactjs.org/)
- [React Redux](https://es.redux.js.org/)
- [React Router](https://github.com/remix-run/react-router)
- [SASS](https://sass-lang.com/)

## Support libraries 📚

- [Formik](https://github.com/formium/formik)
- [Nodemon](https://nodemon.io/)
- [React-toastify](https://github.com/fkhadra/react-toastify)
- [React-dropzone](https://react-dropzone.js.org/)
- [React-icons](https://react-icons.github.io/react-icons/)
- [React-custom-scrollbars](https://github.com/malte-wessel/react-custom-scrollbars)
- [Validator](https://github.com/validatorjs/validator.js/)
- [Yup](https://github.com/jquense/yup)

## Wishlist ✨
- Lazy loading
- User view
- Edit uploaded content
