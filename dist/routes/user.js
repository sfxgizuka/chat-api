"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("../controllers/user.service");
const post_service_1 = require("../controllers/post.service");
const router = (0, express_1.Router)();
//get user here
router.get('/', user_service_1.getUsers);
//sign up here
router.post('/signup', user_service_1.signUp);
//login here
router.post('/login', user_service_1.login);
//protected routes
//create a user post
router.post('/:id/posts', user_service_1.auth, post_service_1.makePost);
exports.default = router;
