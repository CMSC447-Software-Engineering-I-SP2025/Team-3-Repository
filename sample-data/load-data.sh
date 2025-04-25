mongoimport --db=application-tracker --collection=users --drop --jsonArray users.json
mongoimport --db=application-tracker --collection=application --drop --jsonArray applications.json
mongoimport --db=application-tracker --collection=job --drop --jsonArray jobs.json