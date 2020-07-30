# Group Project: Explore World Heritage Sites (Main README)

# Info
Project name: Explore World Heritage Sites

Team Name: Three Musketeers

Team members: Yiwen Fang, Dong Liu, Peng Hao

(This) API repo link: https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_ThreeMusketeers_API

UI repo link: https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_ThreeMusketeers_UI

Part of the file structures and codes are referenced from
https://www.udemy.com/course/react-nodejs-express-mongodb-the-mern-fullstack-guide/

# Iterations

## Iteration 1
* Build REST API as backend API server by Node.js and Express. Add routing and relative routes. ESLint is used to make up JavaScript code. Note: `|| exit 0` in `"lint": "eslint . || exit 0"` is used to hide the exit status which is not important.
* Handle errors for http requests by creating HttpError class inherited from Error. Http requests are tested by Postman.
* Add controllers to make `xxx-routes.js` files more organized.
* Add POST routes to create comment and user. `uuid` is used to create a unique uid for the user.
* Add PATCH routes to update and DELETE routes to delete.
* Add validations for request bodies by using `express-validator`.
* Routing, links, and the basis of a CRUD schema (based on Mongoose) are established. MongoDB is used as the database to store three collections `places`, `comments`, and `users`. Mongoose is used to operate the database. The schemas and models are created. `mongoose-unique-validator` is used to help the validation where necessary.
* MongoDB Atlas is used to as the cloud database. A local hosted database is also setup for development. The backend is connected with MongoDB. Some scripts in the `scripts` folder are used to populate dummy data (e.g., Mockaroo) for testing. Note: The transaction related code in `users-controllers.js` works well for cloud MongoDB, but not for the local database. (https://www.udemy.com/course/react-nodejs-express-mongodb-the-mern-fullstack-guide/learn/lecture/16929028#questions/8687580) Comment out code parts when using local database at the development stage. However, is will be OK after deploying to the cloud.
* The CRUD module containing the main functionality is added. The `GET`, `POST`, `PATCH`, and `DELETE` methods work well to make any queries or mutations. The screenshots to show part of backend API links and HTTP methods from Postman are shown below.

![postman_1.png](/readme_images/postman_1.png)

![postman_2.png](/readme_images/postman_2.png)

![postman_3.png](/readme_images/postman_3.png)

![postman_4.png](/readme_images/postman_4.png)
