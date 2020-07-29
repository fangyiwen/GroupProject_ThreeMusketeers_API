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
