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
3. In another terminal/window, run the following in the "resume-tracker-ui" directory:
    - `npm run dev`

Now all the services are started. You can access the UI at `https://localhost:3000`
