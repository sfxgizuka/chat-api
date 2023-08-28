"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("../controllers/user.service");
const post_service_1 = require("../controllers/post.service");
const joi_middleware_1 = require("../middleware/joi.middleware");
const user_schema_1 = require("../schemas/user.schema");
const post_schema_1 = require("../schemas/post.schema");
const router = (0, express_1.Router)();
//get user here
router.get('/', user_service_1.getUsers);
//sign up here
router.post('/signup', (0, joi_middleware_1.validateInput)(user_schema_1.userSchema), user_service_1.signUp);
//login here
router.post('/login', (0, joi_middleware_1.validateInput)(user_schema_1.loginSchema), user_service_1.login);
//protected routes
//create a user post
router.post('/:id/posts', user_service_1.auth, (0, joi_middleware_1.validateInput)(post_schema_1.postSchema), post_service_1.makePost);
exports.default = router;
