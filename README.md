# Group Project: Explore World Heritage Sites (Main README)
**Note:** This main README is focused on the update of API. For the update of UI, please the UI repo link as provided.

# Info
Project name: Explore World Heritage Sites

Team Name: Three Musketeers

Team members: Yiwen Fang, Dong Liu, Peng Hao

(This) API repo link: https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_ThreeMusketeers_API

UI repo link: https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_ThreeMusketeers_UI

Part of the file structures and codes are referenced from
https://www.udemy.com/course/react-nodejs-express-mongodb-the-mern-fullstack-guide/

# Introduction
**Goals**
1. Provide a vivid website for UNESCO World Heritage sites for potentially interested tourists. Users can search and filter by various criteria to look for their interests.
2. Users can add their texts, photos, and comments. Therefore, the other users can also see these posts.

**Features**
1. Provide sign up and login functions to save user data.
2. Visualize different sites on Google Maps.
3. Display and filter various information of heritage sites.
4. Save and post user reviews and update the database accordingly.
5. Display heritage site map or list based on the query.

# Iterations

## Iteration 1
**Contribution**
* Yiwen Fang: API, database, and CRUD schema/method.
* Dong Liu: UI, routing, and link.
* Peng Hao: UI, routing, and link.

**Update**
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
