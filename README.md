# CMSC447 Team Repository


## Authors
TBD

## Required Packages/Applications
- NodeJS
- NPMJS
- Docker
- MongoDB Community Tools
- Java Version 21 or Newer
- Gradle

## Setup Guide
1. Install Docker Desktop
    - https://docs.docker.com/desktop/
2. Install NodeJS
    - https://nodejs.org/en/download
3. Install MongoDB
    - https://www.mongodb.com/docs/mongodb-shell/install/
4. Install Java
    - ( find this yourself )
5. Install Gradle
    - https://docs.gradle.org/current/userguide/installation.html

## Running the Stack
1. Run `docker compose up -d` from the ROOT directory.
    - If nothing fails, you win.
2. To start the Backend API, go into the "backend" dir and run the following:
    - `./gradlew bootRun`
3. Go into the "application-tracker-ui" directory.
    - `npm install`
4. To start the UI, run the following command in that same directory 
    - `npm run dev`
5. Load the **required** sample data. Nothing will really work otherwise.
    - `cd ./sample-data && ./load-data.sh`

## Accessing the Application(s)
### UI
- Open your favorite browser.
- Go to `http://localhost:3000`
- If you have not logged in within the past hour, you will be redirected to the login page.
### API
- The API does not have a web interface. Please use either **Postman** or **cURL** to interact with it.
- Find the desired controller you wish to access.
- Find the desired endpoint you want to hit.
- Create the request in Postman/CURL.
    - If you have not acquired a login token you will need to do the following.
    - Hit the login endpoint with the testing credentials ( listed below ) to acquire a JWT token.
    - In your new request, go to "Authorization" and select "Bearer Token".
    - On the right side in the texbox, paste the token you were given.
    - **Tokens expire every 10-20 mins**.
- Send the request. You should get data back depending on what endpoint you are hitting!

## Login Credentials ( from sample-data ):
Username: test-user <br/>
Password: test-password
