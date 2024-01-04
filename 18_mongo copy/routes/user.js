const express = require("express");
const {displayUsers, getAllUsers, getUserById, addUser, editJobtitleById, dltUserById} = require("../controllers/user")

//is router ko use krke hum apne routes bna skte h
//qki is file me hmare paas app to available h nhi index.js ki tarah
//to app.get ya app.post ki jagah router.get and router.post use krenge
const router = express.Router();

//ROUTES
//TEST THESE REQUESTS IN POSTMAN

router.get("/users" , displayUsers)

router.get("/api/users" , getAllUsers)

//async function bnadia ise
//WE CAN TEST THIS REQUEST IN POSTMAN
// link -> http://localhost:8000/api/users
// method -> post
// go to body -> x-www-form-urlencoded
//and add first_name,last_name .... as keys and give values
router.post("/api/users" , addUser);

router.get("/api/users/:id" , getUserById)

router.patch("/api/users/:id" , editJobtitleById);

router.delete("/api/users/:id" , dltUserById)

module.exports = router;