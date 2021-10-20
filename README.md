# PM Friday

#### your project managent assistant

## Intro

PM Friday is a project management app that helps to manage cases requiring time tracking. For most project management app such as Trello, I found there is no easy-to-use time tracking feature that suits my need: displaying used time and total approved time in one place.

## Features

### Home Page

The home page becomes accessible after signing in if an account has been created. A new user can create an account by clicking the sign-up link, and they will be automatically signed in after an account is successfully created. Otherwise, the user will be redirected to the sign-in page. Sign-out is located in the navigation.

On the home page, all the project’s previews (name and date of creation) are displayed. A user may use the search bar to quickly locate the project of interest. An add button is provided to create new projects. A new page will prompt you with the profile of the profile, and project name is the minimum requirement.

### Project Page

The project page shows all information about the particular project. Each project has the following sections: profile, times, todos, and note.
Profile section shows the information filled during the project creation. “Edit profile” button allows the user to edit the profile info.

The times section allows the user to add, modify, and delete time tracking. A progress bar shows the ratio of used time vs unused time along with the field is used to log time.

The todo section allows users to add, delete, check and uncheck tasks with checked tasks that are put at the end of the todo list.

The note section is a rich text editor for the users to write anything that doesn't fit in other sections.

Finally, the project can be deleted from the project page. Confirmation of deletion was added for preventing a deletion by mistake, inspired by Github.

Lastly, PM Friday was designed mainly for desktop use, but added responsiveness enables other screen sizes.

## Usage

### Note

PMFriday provides user authentication via Firebase and storage in Firestore. To use, please sign up with firebase first and turn on Email/Password and Google as Sign-in provider before follwing the next step.

### Setup

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

## Lastly

PM Friday was designed mainly for desktop use, but added responsiveness enables other screen sizes.

p.s. PMFriday is easily to be modified with more features. Fell free to clone and modify it to suit your need.

_developed by Auguest Gao, 2021_
