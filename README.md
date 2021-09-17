# PM Friday
### your project managent assistant


## Usage
PM Friday is a project management app which helps to managing cases which requires time track. For the most project managemnt app such as Trello, I found there is no time easy-to-use time tracking feature that suits my need: listing used time and total approved time (by company) in one place that I can log time. 


## Features
PM Friday uses Firebase authentication for signin, signup and signout functions, and uses Firestore as its NoSQL database. Therefore, it requires a firebase account and soem basic setup (see setup section). The route will be redirected to signin or to home page according to the situation. 

Some buttons such add and create may be disabled for the sinario when creating a case without a name, for it makes the most sense. The minimum requirement of creating a card is to have a name, then the create button is clickable. 

The home page is an card overview page where all the added card's name and creation time appears here. The search function allows the user to locate a case fastly and conviently. 

Clicking a case preview will enter the card detailed view where the user can add todo list, take note, and access to profile editting and time editting page. The case won't be save until the dave button is clicked. This is intentionally designed so for my own perference. A confirm deletion button is inspired by Github for preventing deletion by mistake. 

Lastly, PM Friday was designed mainly for desktop use, but added responsiveness enables other screen sizes. 

## Setup
1. `yarn` after york the repo
2. Sign up Firebase and create an app, copy the firebase config (apiKey, authDomain,...).
3. create a file `.env.local` at the root path, replace the keys with below.

```node
// in .env.local
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```
4. `yarn start` to run local development server. 

## Note
The app is easily to be modified with more features. Fell free to clone and modify it to suit your need. 


_developed by Auguest Gao, 2021_