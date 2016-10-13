# Plato

## Description
Plato is a note-taking application that seeks to give users the freedom to take notes in a variety of different ways.

## Installation
To get started, fork & clone the repo and then install the dependencies using `npm install` from the root folder.

Plato expects environment variables with regards to the OAuth strategies that are being used. The following are the environment variables that Plato expects:

* `NODE_ENV` - used to signify dev/production environment
* `FACEBOOK_APP_ID` - used for Facebook OAuth
* `FACEBOOK_APP_SECRET` - used for Facebook OAuth
* `TWITTER_CONSUMER_KEY` - used for Twitter OAuth
* `TWITTER_CONSUMER_SECRET` - used for Twitter OAuth
* `GOOGLE_CLIENT_ID` - used for Google OAuth
* `GOOGLE_CLIENT_SECRET` - used for Google OAuth
* `SLACK_CLIENT_ID` - used for Slack OAuth
* `SLACK_CLIENT_SECRET` - used for Slack OAuth
* `EMAIL_ADDRESS` - used for nodemailer, this should be a valid gmail address that you want to send messages from
* `EMAIL_PW` - used for nodemailer
* `CRYPTR_KEY` - encryption key

## Expected Usage
  1.  User signs in or signs up via the signin/login/signup pages
  2.  User is taken to dashboard, where they will be able to either create a new note, or load an existing note that they have either created themselves or received from another Plato user.
  3.  In the dashboard, Users can also create chatrooms and leverage the chat client to interact with other Plato users.
  4.  

## Architecture
Plato has multiple components that can be split into a few categories

### Front-End
  1.  Login/Signup
    * Facebook OAuth
    * Twitter OAuth
    * Slack OAuth
    * Google OAuth
    * Local Signin/Signup
  2.  Dashboard
    * Text Editor ([Medium-Draft](https://github.com/brijeshb42/medium-draft)), based on Draft.js from Facebook
    * Speech-To-Text Editor (also [Medium-Draft](https://github.com/brijeshb42/medium-draft)), implements [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) for speech-to-text capabilities.
    * Canvas ([Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API))
    * Chat Client

### Back-End
  1.  Auth Endpoints:
    * `POST /api/save-session` : Takes a post request with a Session object and saves the Session object to the database with the user's username
    * `GET /api/:user` : Returns an array of session objects belonging to the user
    * `GET /api/delete-session/:id` : Given a session id, deletes that session from the database
    * `POST /api/:user` : Returns an array of sessions that match a given search input.
    * `GET /api/auth/identify` : Attempts to identify a user if req.session.passport.user exists on the user's request to the server
    * `POST /api/social/share-note` : Given a session id and a destination email, shares the note with the destination email's account (if it exists in the Plato database);

